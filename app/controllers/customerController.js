const { Customer, BaseError } = require("../models");
const { encrypt } = require("../services/encrypt");

module.exports = {
	async findAll(_, res) {
		try {
			const customers = await Customer.findAll();
			res.json(customers);
		} catch (err) {
			res.status(500).json(new BaseError(err));
		}
	},
	async findOne(req, res) {
		try {
			const customer = await Customer.findOne(+req.params.id);
			// If customer not exist so return status 204 (No Content)
			if (!customer.id) res.status(204);
			res.json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err));
		}
	},

	async update(req, res) {
		try {
			if (req.body.pseudo === "") delete req.body.pseudo;
			// We pass the id in the object to update a
			const customer = await new Customer({
				id: +req.params.id,
				...req.body,
			}).update();
			if (!customer.id) res.status(204);
			res.json(customer);
		} catch (err) {
			res.status(500).json(new BaseError(err));
		}
	},

	async delete(req, res) {
		try {
			const customer = await Customer.delete(+req.params.id);
			res.json("Customer Deleted");
		} catch (err) {
			res.status(500).json(new BaseError(err));
		}
	},
};
