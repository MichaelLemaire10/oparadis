const { Animal, BaseError } = require("../models");
const { cloudCreate, cloudDelete } = require('../services/cloud');

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
			if(req.body.photo) req.body.photo = await cloudCreate(req.body.photo);
			const animal = await new Animal(req.body).save();
			res.status(201).json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async update(req, res) {
		try {
			if(req.body.photo){
				// Delete old image
				const animal = await Animal.findOne(+req.params.id);				
				await cloudDelete(animal.photo);
				// Create new image
				req.body.photo = await cloudCreate(req.body.photo);
			};
			const animal = await new Animal({
				id: +req.params.id,
				...req.body,
			}).update();
			if (!animal.id) res.status(404).json('Not found');
			res.json(animal);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async delete(req, res) {
		try {
			const animal = await Animal.findOne(+req.params.id);
			await cloudDelete(animal.photo);
			await Animal.delete(+req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
