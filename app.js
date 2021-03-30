//	@ghasemkiani/baseapp/app

const path = require("path");
const Preferences = require("preferences");
const {Command} = require("commander");
const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {irunner} = require("@ghasemkiani/commonbase/util/runner");

class App extends cutil.mixin(Base, irunner) {
	get commander() {
		if(!this._commander) {
			this._commander = new Command();
		}
		return this._commander;
	}
	set commander(commander) {
		this._commander = commander;
	}
	get prefsFile() {
		if(!this._prefsFile && this.useLocalPrefsFile) {
			this._prefsFile = path.join(path.dirname(module.filename), this.prefsId + ".prefs.json");
		}
		return this._prefsFile;
	}
	set prefsFile(prefsFile) {
		this._prefsFile = prefsFile;
	}
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
	}
	set prefs(prefs) {
		this._prefs = prefs;
	}
	parseInitOptions() {
		this.commander.parse(process.argv);
	}
	defineInitOptions() {
		this.commander.option("--prefs <prefs>", "The path to the preferences file");
	}
	async toApplyInitOptions() {
		let opts = this.commander.opts();
		if(!cutil.isNil(opts.prefs)) {
			this.prefsFile = opts.prefs;
		}
	}
	async toAskInitOptions() {
		//
	}
	async toDoStart() {
		this.defineInitOptions();
		this.parseInitOptions();
		await this.toApplyInitOptions();
		await this.toAskInitOptions();
		await this.toRun();
	}
	async toRun() {
		//
	}
}
cutil.extend(App.prototype, {
	_commander: null,
	prefsId: "app.temp",
	prefsEncrypt: false,
	prefsFormat: "json",
	useLocalPrefsFile: false,
	_prefsFile: null,
	_prefs: null,
	defaultPrefs: {},
});

module.exports = {App};
