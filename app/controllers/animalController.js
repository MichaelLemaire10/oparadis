const { Animal, BaseError } = require("../models");

module.exports = {
	async findAll(_, res) {
		try {
			const animal = await Animal.findAll();
			res.json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async findOne(req, res) {
		try {
			const animal = await Animal.findOne(+req.params.id);
			!animal.id ? res.status(404).json('Not found') : res.json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async save(req, res) {
		try {
			const animal = await new Animal(req.body).save();
			res.status(201).json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async update(req, res) {
		try {
			const animal = await new Animal({
				id: +req.params.id,
				...req.body,
			}).update();
			!animal.id ? res.status(404).json('Not found') : res.json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async delete(req, res) {
		try {
			await Animal.delete(+req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
