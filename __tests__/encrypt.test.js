const encrypt = require("./encrypt");
// @ponicode
describe("encrypt.encrypt", () => {
	test("0", async () => {
		await encrypt.encrypt("accessdenied4u");
	});

	test("1", async () => {
		await encrypt.encrypt("YouarenotAllowed2Use");
	});

	test("2", async () => {
		await encrypt.encrypt("NoWiFi4you");
	});

	test("3", async () => {
		await encrypt.encrypt("!Lov3MyPianoPony");
	});

	test("4", async () => {
		await encrypt.encrypt("");
	});
});

// @ponicode
describe("encrypt.compare", () => {
	test("0", async () => {
		await encrypt.compare("accessdenied4u", "$p3onyycat");
	});

	test("1", async () => {
		await encrypt.compare("YouarenotAllowed2Use", "!Lov3MyPianoPony");
	});

	test("2", async () => {
		await encrypt.compare("$p3onyycat", "$p3onyycat");
	});

	test("3", async () => {
		await encrypt.compare("!Lov3MyPianoPony", "NoWiFi4you");
	});

	test("4", async () => {
		await encrypt.compare("NoWiFi4you", "!Lov3MyPianoPony");
	});

	test("5", async () => {
		await encrypt.compare("", "");
	});
});
