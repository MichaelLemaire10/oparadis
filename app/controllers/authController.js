const { Authentication, BaseError } = require("../models");
const {
	makeToken,
	generateRefreshToken,
	validateRefreshedToken,
} = require("../services/jwt");
const { cache, verifyToken, deleteToken } = require("../services/tokenCache");
const { encrypt, compare } = require("../services/encrypt");

module.exports = {
	async signup(req, res) {
		try {
			// delete field repeat_password
			delete req.body.repeat_password;
			// encrypt the password
			req.body.password = await encrypt(req.body.password);
			const customer = await new Authentication(req.body).signup();
			delete customer.password;
			res.status(201).json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err.message, 500));
		}
	},

	async signin(req, res) {
		try {
			// we retrieve the email to verify that it
			// exists and we verify the password
			const { email, password } = req.body;
			const customer = await Authentication.authFindOne(email);
			if (!customer) {
				return res.status(401).send("Customer does not exist");
			}
			const verifiedPassword = await compare(password, customer.password);
			if (verifiedPassword === false) {
				return res.status(401).send("Password does not match");
			}
			delete customer.password;
			// We create a token with a short validity
			// and a token(refresh) with a long validity
			// then a store the token(refresh) and the
			// associated id to be able to check it
			const access_token = await makeToken(customer);
			const refresh_token = await generateRefreshToken(customer);
			const token = {
				access_token: `Bearer ${access_token}`,
				refresh_token: `Bearer ${refresh_token}`,
			};
			cache(customer.id, token.refresh_token.split(" ")[1]);
			// allows the client to access the header
			res.setHeader("Access-Control-Expose-Headers", [
				"Authorization",
				"RefreshToken",
			]);
			res.setHeader("Authorization", token.access_token);
			res.setHeader("RefreshToken", token.refresh_token);
			delete customer.isadmin;
			res.status(200).json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err.message, 500));
		}
	},

	async refreshToken(req, res) {
		try {
			const ref_token =
				req.headers.authorization && req.headers.authorization.split(" ")[1];
			// checks that the token has the authorization
			if (!ref_token) {
				return res.sendStatus(401);
			}
			// Checks the validity of the token
			const payload = validateRefreshedToken(ref_token);
			if (!payload.data) {
				return res.sendStatus(403);
			}
			// Checks that the token exists in redis
			const verifiedToken = await verifyToken(payload.data.id, ref_token);
			if (!verifiedToken) {
				return res.sendStatus(401);
			}
			//Make a token
			const access_token = await makeToken(payload.data);
			const refresh_token = ref_token;
			const token = {
				access_token: `Bearer ${access_token}`,
				refresh_token: `Bearer ${refresh_token}`,
			};
			res.setHeader("Access-Control-Expose-Headers", [
				"Authorization",
				"RefreshToken",
			]);
			res.setHeader("Authorization", token.access_token);
			res.setHeader("RefreshToken", token.refresh_token);
			res.status(200).json(payload.data);
		} catch (err) {
			if (err.message === "invalid token") {
				return res.sendStatus(401);
			}
			return res.json(err.message);
		}
	},
	async disconnect(req, res) {
		try {
			const token =
				req.headers.authorization && req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.sendStatus(401);
			}
			const payload = validateRefreshedToken(token);
			if (!payload.data) {
				return res.sendStatus(403);
			}
			const verifiedToken = await verifyToken(payload.data.id, token);
			if (!verifiedToken) {
				return res.sendStatus(401);
			}
			//delete token
			const deleted = await deleteToken(payload.data.id);
			if (!deleted) {
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		} catch (err) {
			if (err.message === "invalid token") {
				return res.sendStatus(401);
			}
			return res.json(err.message);
		}
	},

	async isAdmin(req, res) {
		try {
			// We check if the customer is admin
			const customer = await Authentication.isAdmin(+req.params.id);
			if (!customer.id) res.status(404).json("Not found");
			res.json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async update_isAdmin(req, res) {
		try {
			// Change the value of isAdmin of the customer
			const customer = await new Authentication({
				id: +req.params.id,
				...req.body,
			}).update_isAdmin();
			res.json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async update_password(req, res) {
		try {
			const pass = await Authentication.getPassword(+req.params.id);
			const verifiedPassword = await bcrypt.compare(
				req.body.ancient_password,
				pass.password
			);
			verifiedPassword
				? null
				: res.status(401).json("ancient_password is incorrect");
			req.body.password !== req.body.repeat_password
				? res.status(401).json("password and repeat_password must be the same")
				: null;
			delete req.body.repeat_password;
			req.body.password = await encrypt(req.body.password);
			//? We pass the id in the object to update the password
			const customer = await new Authentication({
				id: +req.params.id,
				...req.body,
			}).update_password();
			if (!customer) throw new Error({ code: 404 });
			return res.sendStatus(200);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
