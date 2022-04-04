const jwt = require("jsonwebtoken");

const { jwt_secret, refresh_jwt_secret } = require("../config");

module.exports = {
	makeToken(user) {
		try {
			// Creation of a token
			// algoritm : type of encryption
			// expiresIn : period of validity
			// Method jwt : this method requires two parameters an object and a key
			//return token
			return jwt.sign({ data: user }, jwt_secret, {
				algorithm: "HS256",
				expiresIn: "5s",
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	validateToken(token) {
		try {
			// Checks the validity of the token return an object with the data stored in the jwt
			return jwt.verify(token, jwt_secret, { algorithm: "HS256" });
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	generateRefreshToken(user) {
		try {
			// Creation of a new refresh token and return this refresh token
			return jwt.sign({ data: user }, refresh_jwt_secret, {
				algorithm: "HS256",
				expiresIn: "10s",
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	validateRefreshedToken(token) {
		try {
			// Checks the validity of the refresh token
			return jwt.verify(token, refresh_jwt_secret, { algorithm: "HS256" });
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};
