const { Plant, BaseError } = require("../models");

module.exports = {
	async findAll(_, res) {
		try {
			const plant = await Plant.findAll();
			res.json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async findOne(req, res) {
		try {
			const plant = await Plant.findOne(+req.params.id);
			if(!plant) res.status(404).json('Not found');
			res.json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async save(req, res) {
		try {
			const plant = await new Plant(req.body).save();
			res.status(201).json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async update(req, res) {
		try {
			const plant = await new Plant({
				id: +req.params.id,
				...req.body,
			}).update();
			if (!plant.id) res.status(404).json('Not found');
			res.json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async delete(req, res) {
		try {
			await Plant.delete(+req.params.id);
			res.status(204);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
