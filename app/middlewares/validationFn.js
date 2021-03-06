const { validateBody, validateParams } = require("./validationMW");
const {
	bodySchema,
	paramsSchema,
	signup,
	signin,
	update_password,
	update_customer,
	add_house,
	update_house,
	add_animal,
	update_animal,
	add_absentee,
	update_absentee,
	add_photo,
	update_photo,
	add_plant,
	update_plant,
	add_type,
	update_type,
} = require("../schemas/");

module.exports = {
	signup_Validation: validateBody(signup),
	signin_Validation: validateBody(signin),
	update_passwordValidation: validateBody(update_password),
	update_customerValidation: validateBody(update_customer),
	add_houseValidation: validateBody(add_house),
	update_houseValidation: validateBody(update_house),
	add_animalValidation: validateBody(add_animal),
	update_animalValidation: validateBody(update_animal),
	add_absenteeValidation: validateBody(add_absentee),
	update_absenteeValidation: validateBody(update_absentee),
	add_photoValidation: validateBody(add_photo),
	update_photoValidation: validateBody(update_photo),
	add_plantValidation: validateBody(add_plant),
	update_plantValidation: validateBody(update_plant),
	bodyValidation: validateBody(bodySchema),
	paramsValidation: validateParams(paramsSchema),
	add_typeValidation: validateBody(add_type),
	update_typeValidation: validateBody(update_type),
};
