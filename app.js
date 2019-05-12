//	@ghasemkiani/baseapp/app

const path = require("path");
const Preferences = require("preferences");
const commander = require("commander");
const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {irunner} = require("@ghasemkiani/commonbase/util/runner");

class App extends cutil.mixin(Base, irunner) {}
cutil.extend(App.prototype, {
	commander: commander,
	prefsId: "app.temp",
	prefsEncrypt: false,
	prefsFormat: "json",
	useLocalPrefsFile: false,
	_prefsFile: null,
	get prefsFile() {
		if(!this._prefsFile && this.useLocalPrefsFile) {
			this._prefsFile = path.join(path.dirname(module.filename), this.prefsId + ".prefs.json");
		}
		return this._prefsFile;
	},
	set prefsFile(prefsFile) {
		this._prefsFile = prefsFile;
	},
	_prefs: null,
	get prefs() {
		if (!this._prefs) {
			let options = {
				encrypt: this.prefsEncrypt,
				format: this.prefsFormat,
			};
			if(this.prefsFile) {
				options.file = this.prefsFile;
			}
			this._prefs = new Preferences(this.prefsId, this.defaultPrefs, options);
		}
		return this._prefs;
	},
	set prefs(prefs) {
		this._prefs = prefs;
	},
	defaultPrefs: {},
	parseInitOptions() {
		this.commander.parse(process.argv);
	},
	defineInitOptions() {
		this.commander.option("--prefs <prefs>", "The path to the preferences file");
	},
	async toApplyInitOptions() {
		if(!cutil.isNil(this.commander.prefs)) {
			this.prefsFile = this.commander.prefs;
		}
	},
	async toAskInitOptions() {
		//
	},
	async toDoStart() {
		console.log(`toDoStart`);
		this.defineInitOptions();
		this.parseInitOptions();
		await this.toApplyInitOptions();
		await this.toAskInitOptions();
		await this.toRun();
	},
	async toRun() {
		//
	},
});

module.exports = {App};
