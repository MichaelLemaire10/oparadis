const { Plant, BaseError } = require("../models");
const { cloudCreate, cloudDelete } = require('../services/cloud');

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
			!plant.id ? res.status(404).json('Not found') : res.json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},

	async save(req, res) {
		try {
			if(req.body.photo) req.body.photo = await cloudCreate(req.body.photo);
			const plant = await new Plant(req.body).save();
			res.status(201).json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async update(req, res) {
		try {
			if(req.body.photo){
				// Delete old image
				const plant = await Plant.findOne(+req.params.id);				
				await cloudDelete(plant.photo);
				// Create new image
				req.body.photo = await cloudCreate(req.body.photo);
			};
			const plant = await new Plant({
				id: +req.params.id,
				...req.body,
			}).update();
			!plant.id ? res.status(404).json('Not found') : res.json(plant);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
	async delete(req, res) {
		try {
			const plant = await Plant.findOne(+req.params.id);
			await cloudDelete(plant.photo);
			await Plant.delete(+req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.status(500).json(new BaseError(err.message));
		}
	},
};
