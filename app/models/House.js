const client = require("../database.js");

/**
 * @typedef {Object} House
 * @property {number} id
 * @property {number} address
 * @property {number} zip_code
 * @property {number} city
 * @property {number} country
 * @property {number} type
 * @property {number} title
 * @property {number} nb_rooms
 * @property {number} nb_bedrooms
 * @property {number} surface
 * @property {number} area
 * @property {number} floor
 * @property {number} description
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} map
 * @property {number} id
 */

module.exports = class House {
	constructor(obj = {}) {
		for (const prop in obj) {
			this[prop] = obj[prop];
		}
	}

	/**
	 * Retrieves all Houses from database
	 * @static
	 * @async
	 * @returns {Array<House>} All Houses in database
	 * @throws {Error} An error
	 */
	static async findAll() {
		try {
			const { rows } = await client.query("SELECT * FROM house");
			return rows.map((row) => new House(row));
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail);
			}
			throw error;
		}
	}

	/**
	 * Retrieves one House from database
	 * @static
	 * @async
	 * @returns {Object<House>} One House in database
	 * @throws {Error} An error
	 */
	static async findOne(id) {
		try {
			const { rows } = await client.query("SELECT * FROM house WHERE id=$1", [
				id,
			]);
			return rows[0] ? new House(rows) : undefined;
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail);
			}
			throw error;
		}
	}

	/**
	 * Creates a new House in database
	 * @async
	 * @returns {Object<House>} Creates a new House in database
	 * @throws {Error} An error
	 */
	async save() {
		try {
			const { rows } = await client.query("SELECT * FROM add_house($1)", [
				this,
			]);
			return rows[0] ? new House(rows) : undefined;
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail);
			}
			throw error;
		}
	}

	/**
	 * Updates a House in database
	 * @async
	 * @returns {Object<House>} Updates a House in database
	 * @throws {Error} An error
	 */
	async update() {
		//TODO verify modified field and update validation to true if certain fields are modified.

		// const tata = await House.findOne(this.id)

		// if ()...
		try {
			const { rows } = await client.query("SELECT * FROM update_house($1)", [
				this,
			]);
			return rows[0] ? new House(rows) : undefined;
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail);
			}
			throw error;
		}
	}
	/**
	 * Delete a House in database
	 * @async
	 * @returns {Object<House>} Delete a House in database
	 * @throws {Error} An error
	 */
	static async delete(id) {
		try {
			await client.query("delete from house where id = $1", [id]);
			return;
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail);
			}
			throw error;
		}
	}
};
