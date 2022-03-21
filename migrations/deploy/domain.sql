-- Deploy oparadis:domain to pg

BEGIN;

--? the domain allows you to check and use it several times
CREATE DOMAIN posint AS INT CHECK(VALUE >= 0);
-- change the type of a field
ALTER TABLE HOUSE 
    ALTER COLUMN nb_rooms TYPE posint,
    ALTER COLUMN nb_bedrooms TYPE posint,
    ALTER COLUMN surface TYPE posint,
    ALTER COLUMN area TYPE posint,
    ALTER COLUMN "floor" TYPE posint;

-- view allows to call a select from sql
CREATE VIEW house_full_find_all as
	SELECT house.id,
			house.address,
			house.zip_code,
			house.city,
			(select json_agg(json_build_object(country.id,country.country)) from country
				where house.country = country.id) as country,
			(select json_agg(json_build_object(house_type.id,house_type.type)) from house_type
				where house_type.id = house.type) as type,
			house.title,
			house.nb_rooms,
			house.nb_bedrooms,
			house.surface,
			house.area,
			house.floor,
			house.description,
			house.latitude,
			house.longitude,
			house.map,
			house.internet,
			house.washing_machine,
			house.TV,
			house.hoven,
			house.microwave,
			house.dishwasher,
			house.bathtub,
			house.shower,
			house.parking,
			house.created_at,
			house.updated_at,
			house.validation,
			(SELECT array_agg(json_build_object(
				'id', customer.id,
				'email', customer.email,
				'firstname', customer.firstname,
				'lastname', customer.lastname,
				'phone_number', customer.phone_number,
				'avatar', customer.avatar,
				'created_at', customer.created_at, 
				'updated_at', customer.updated_at))
			FROM customer WHERE customer.id = house.customer_id)
			AS customer,
			(SELECT array_agg(json_build_object(
				'id', animal.id,
				'type', animal.type,
				'race', animal.race,
				'diseases', animal.diseases,
				'notes', animal.notes,
				'photo', animal.photo,
				'created_at', animal.created_at,
				'updated_at', animal.updated_at,
				'validation', animal.validation)
			ORDER BY animal.id asc)
			FROM animal WHERE animal.customer_id = customer.id)
			AS animals,
			(SELECT array_agg(json_build_object(
				'id', plant.id,
				'type', plant.type,
				'notes', plant.notes,
				'photo', plant.photo,
				'created_at', plant.created_at,
				'updated_at', plant.updated_at,
				'validation', plant.validation)
			ORDER BY plant.id asc)
			FROM plant WHERE plant.customer_id = customer.id)
			AS plant,
			(SELECT array_agg(json_build_object(
				'id', photo.id,
				'photo', photo.photo,
				'created_at', photo.created_at,
				'updated_at', photo.updated_at,
				'validation', photo.validation)
			ORDER BY photo.id asc)
			FROM photo JOIN house ON house.customer_id = customer.id
			WHERE photo.customer_id = house.id)
			AS photos,
			(SELECT array_agg(json_build_object(
				'id', id,
				'starting_date', starting_date,
				'ending_date', ending_date,
				'house_sitter',house_sitter)
			ORDER BY absentee.id asc)
			FROM absentee WHERE absentee.customer_id= customer.id)
			AS absentee
	FROM house
	full outer JOIN customer ON customer.id = house.customer_id
	full outer JOIN animal ON animal.customer_id = customer.id
	full outer JOIN plant ON plant.customer_id = customer.id
	full outer JOIN photo ON photo.customer_id = customer.id
	full outer JOIN absentee ON absentee.customer_id = customer.id
	JOIN house_type ON house_type.id = house.type
	JOIN country ON country.id = house.country
	GROUP BY customer.id, house.id
	ORDER BY house.id;

-- function sql return an select
CREATE or replace function house_full_find_one(int) returns house_full_find_all as $$
	SELECT * FROM house_full_find_all WHERE id = $1;
$$ LANGUAGE sql strict;

CREATE VIEW house_find_all as
	SELECT house.id,
		house.address,
		house.zip_code,
		house.city,
		(select json_agg(json_build_object(country.id,country.country)) from country
			where house.country = country.id) as country,
		(select json_agg(json_build_object(house_type.id,house_type.type)) from house_type
			where house_type.id = house.type) as type,
		house.title,
		house.nb_rooms,
		house.nb_bedrooms,
		house.surface,
		house.area,
		house.floor,
		house.description,
		house.latitude,
		house.longitude,
		house.map,
		house.internet,
		house.washing_machine,
		house.TV,
		house.hoven,
		house.microwave,
		house.dishwasher,
		house.bathtub,
		house.shower,
		house.parking,
		house.created_at,
		house.updated_at,
		house.validation FROM house;

CREATE or replace function house_find_one(int) returns house_find_all as $$
	SELECT * FROM house_find_all WHERE id = $1;
$$ LANGUAGE sql strict;

CREATE VIEW house_find_four as
	SELECT * FROM house_find_all ORDER BY updated_at DESC LIMIT 4;

CREATE VIEW customer_all_id as
	SELECT * ,
	(SELECT array_agg
	(json_build_object('id', house.id)ORDER BY house.id asc)
	FROM house WHERE house.customer_id = customer.id) AS house,
	(SELECT array_agg(json_build_object('id', animal.id)ORDER BY animal.id asc)
	FROM animal WHERE animal.customer_id = customer.id) AS animal,
	(SELECT array_agg(json_build_object('id', plant.id)ORDER BY plant.id asc)
	FROM plant WHERE plant.customer_id = customer.id) AS plant,
	(SELECT array_agg(json_build_object('id', photo.id)ORDER BY photo.id asc)
	FROM photo WHERE photo.customer_id = customer.id) AS photo,
	(SELECT array_agg(json_build_object('id', absentee.id)ORDER BY absentee.id asc)
	FROM absentee WHERE absentee.customer_id = customer.id) AS absentee
	FROM customer;

COMMIT;