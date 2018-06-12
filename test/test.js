const assert = require("assert");
const {App} = require("@ghasemkiani/baseapp/app");

describe("App", function () {
	describe("prefsId", function () {
		let app = new App();
		it("should be equal to 'app.temp'", function () {
			assert.equal(app.prefsId, "app.temp");
		});
	});
});
