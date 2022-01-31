const { Type, BaseError } = require("../models");

module.exports = {
	async findAll(_, res) {
		try {
			const types = await Type.findAll();
			res.json(types);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async findOne(req, res) {
		try {
			const type = await Type.findOne(+req.params.id);
			if(!type) res.status(404).json('Not found');
			res.json(type);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async save(req, res) {
		try {
			const type = await new Type({
				id: +req.params.id,
				...req.body,
			}).save();
			res.status(201).json(type);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async update(req, res) {
		try {
			const type = await new Type({
				id: +req.params.id,
				...req.body,
			}).update();
			if (!type.id) res.status(404).json('Not found');
			res.json(type);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async delete(req, res) {
		try {
			await Type.delete(+req.params.id);
			res.status(204);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
