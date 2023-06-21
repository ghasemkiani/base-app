//	@ghasemkiani/base-app/app

import os from "node:os";
import path from "node:path";

import Preferences from "preferences";
import {Command} from "commander";

import {Obj} from "@ghasemkiani/base";
import {cutil} from "@ghasemkiani/base";
import {irunner} from "@ghasemkiani/base-utils";

class App extends cutil.mixin(Obj, irunner) {
	static {
		cutil.extend(this.prototype, {
			_commander: null,
			prefsEncrypt: false,
			prefsFormat: "json",
			useLocalPrefsFile: false,
			_prefsFile: null,
			_prefs: null,
			prefsId: "app.temp",
			defaultPrefs: {},
		});
	}
	get commander() {
		if (!this._commander) {
			this._commander = new Command();
		}
		return this._commander;
	}
	set commander(commander) {
		this._commander = commander;
	}
	get prefsFile() {
		if (!this._prefsFile) {
			let fname = this.prefsId + ".prefs.json";
			if (this.useLocalPrefsFile) {
				this._prefsFile = path.join(path.dirname(cutil.getUrlFilename(import.meta.url)), fname);
			} else {
				this._prefsFile = path.join(os.homedir(), fname);
			}
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
			if (this.prefsFile) {
				options.file = this.prefsFile;
			}
			this._prefs = new Preferences(this.prefsId, this.defaultPrefs, options);
		}
		return this._prefs;
	}
	set prefs(prefs) {
		this._prefs = prefs;
	}
	async toParseInitOptions() {
		await this.commander.parseAsync(process.argv);
	}
	async toDefineInitOptions() {
		this.commander.option("--prefs <prefs>", "The path to the preferences file");
	}
	async toApplyInitOptions() {
		let opts = this.commander.opts();
		if (!cutil.isNil(opts.prefs)) {
			this.prefsFile = opts.prefs;
		}
	}
	async toAskInitOptions() {
		//
	}
	async toDoStart() {
		await this.toDefineInitOptions();
		await this.toParseInitOptions();
		await this.toApplyInitOptions();
		await this.toAskInitOptions();
		await this.toRun();
	}
	async toRun() {
		this.pub("run");
	}
}

export {App};
