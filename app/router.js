const { Router } = require("express");
const {
	customerController,
	houseController,
	animalController,
	photoController,
	absenteeController,
	plantController,
	typeController,
	countryController,
	authController,
} = require("./controllers/");
const { cache, flush } = require("./services/cache");
const {
	cloudMW,
	adminMW,
	jwtMW,
	signin_Validation,
	update_passwordValidation,
	signup_Validation,
	update_customerValidation,
	add_houseValidation,
	update_houseValidation,
	add_animalValidation,
	update_animalValidation,
	add_absenteeValidation,
	update_absenteeValidation,
	add_photoValidation,
	update_photoValidation,
	add_plantValidation,
	update_plantValidation,
	paramsValidation,
	add_typeValidation,
	update_typeValidation,
} = require("./middlewares/");
const router = Router();

// JOI : we use JOI (Validation) to check the formats of receipts from the client(string, number, boolean).
// cache : we use cache (BDD REDIS) to temporarily store data in order to limit queries in POSTGRESQL
// flush : we use flush (BDD REDIS) delete data
// jwtMW : check access permission
// cloudMW : recover photos in base 64
// regex : Double check on id with regex (exple:[1-9]) and joi (number between 1 and 9999)

router
	.get("/isAdmin", jwtMW, authController.isAdmin)
	.post("/signup", signup_Validation, cloudMW, flush, authController.signup)
	.post("/signin", signin_Validation, authController.signin)
	.post("/token", authController.refreshToken)
	.delete("/logout", authController.disconnect);

router.patch("/isAdmin/:id", jwtMW, authController.update_isAdmin);

router.get("/", cache, houseController.findFour);

router
	.get("/customers", jwtMW, cache, customerController.findAll)
	.get(
		"/customers/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		customerController.findOne
	)
	.patch(
		"/customers/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_customerValidation,
		cloudMW,
		flush,
		customerController.update
	)
	.patch(
		"/customers/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/password",
		paramsValidation,
		jwtMW,
		update_passwordValidation,
		flush,
		authController.update_password
	)
	.delete(
		"/customers/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		customerController.delete
	);

router
	.get("/houses/full", cache, houseController.findAllFull)
	.get(
		"/houses/full/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		houseController.findOneFull
	)
	.get("/houses", cache, houseController.findAll)
	.get(
		"/houses/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		houseController.findOne
	)
	.post(
		"/houses",
		jwtMW,
		add_houseValidation,
		cloudMW,
		flush,
		houseController.save
	)
	.patch(
		"/houses/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_houseValidation,
		cloudMW,
		flush,
		houseController.update
	)
	.delete(
		"/houses/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		houseController.delete
	);

router
	.get("/animals", jwtMW, cache, animalController.findAll)
	.get(
		"/animals/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		animalController.findOne
	)
	.post(
		"/animals",
		jwtMW,
		add_animalValidation,
		cloudMW,
		flush,
		animalController.save
	)
	.patch(
		"/animals/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_animalValidation,
		cloudMW,
		flush,
		animalController.update
	)
	.delete(
		"/animals/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		animalController.delete
	);

router
	.get("/photos", jwtMW, cache, photoController.findAll)
	.get(
		"/photos/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		photoController.findOne
	)
	.post(
		"/photos",
		jwtMW,
		add_photoValidation,
		cloudMW,
		flush,
		photoController.save
	)
	.patch(
		"/photos/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_photoValidation,
		cloudMW,
		flush,
		photoController.update
	)
	.delete(
		"/photos/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		photoController.delete
	);

router
	.get("/absentees", jwtMW, cache, absenteeController.findAll)
	.get(
		"/absentees/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		absenteeController.findOne
	)
	.post(
		"/absentees",
		jwtMW,
		add_absenteeValidation,
		cloudMW,
		flush,
		absenteeController.save
	)
	.patch(
		"/absentees/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_absenteeValidation,
		cloudMW,
		flush,
		absenteeController.update
	)
	.delete(
		"/absentees/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		absenteeController.delete
	);

router
	.get("/plants", jwtMW, cache, plantController.findAll)
	.get(
		"/plants/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		plantController.findOne
	)
	.post(
		"/plants",
		jwtMW,
		add_plantValidation,
		cloudMW,
		flush,
		plantController.save
	)
	.patch(
		"/plants/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_plantValidation,
		cloudMW,
		flush,
		plantController.update
	)
	.delete(
		"/plants/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		plantController.delete
	);

router
	.get("/types", jwtMW, cache, typeController.findAll)
	.get(
		"/types/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		typeController.findOne
	)
	.post(
		"/types",
		jwtMW,
		add_typeValidation,
		cloudMW,
		flush,
		typeController.save
	)
	.patch(
		"/types/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		update_typeValidation,
		cloudMW,
		flush,
		typeController.update
	)
	.delete(
		"/types/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cloudMW,
		flush,
		typeController.delete
	);

router
	.get("/countries", jwtMW, cache, countryController.findAll)
	.get(
		"/countries/:id([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])",
		paramsValidation,
		jwtMW,
		cache,
		countryController.findOne
	);

module.exports = router;
