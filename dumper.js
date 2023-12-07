import {cutil} from "@ghasemkiani/base";

const dumper = {
	async toDefineInitOptionsDumper() {
		this.commander.option("--dump", "Show the preference");
	},
	async toApplyInitOptionsDumper() {
		let opts = this.commander.opts();
		if (cutil.a(opts.dump)) {
			console.log(this.prefsFile);
			console.log(JSON.stringify(this.prefs, null, 2));
		}
	},
};

export {dumper};
