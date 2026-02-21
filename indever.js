import process from "node:process";

import { cutil } from "@ghasemkiani/base";

const indever = {
	defaultPrefsIndever: {
		indev: null,
	},
	_indev: null,
	get indev() {
		if (cutil.na(this._indev)) {
			this._indev = cutil.a(this.prefs.indev)
				? this.prefs.indev
				: (process.NODE_ENV !== "production");
		}
		return this._indev;
	},
	set indev(indev) {
		this._indev = indev;
	},
	async toDefineInitOptionsIndever() {
		let app = this;
		app.commander.option("--indev", "set env as development");
		app.commander.option("--set-indev", "set env persistently as development");
		app.commander.option("--inprod", "set env as development");
		app.commander.option("--set-inprod", "set env persistently as production");
		app.commander
			.command("indev")
			.description("set env as development")
			.action(async () => {
				app.sub("run", async () => {
					app.indev = null;
					app.prefs.indev = true;
				});
			});
		app.commander
			.command("inprod")
			.description("set env as production")
			.action(async () => {
				app.sub("run", async () => {
					app.indev = null;
					app.prefs.indev = false;
				});
			});
	},
	async toApplyInitOptionsIndever() {
		let app = this;
    let opts = app.commander.opts();
    if (opts.Indev) {
      app.indev = true;
    }
    if (opts.Inprod) {
      app.indev = false;
    }
    if (opts.SetIndev) {
      app.indev = null;
      app.prefs.indev = true;
    }
    if (opts.SetInprod) {
      app.indev = null;
      app.prefs.indev = false;
    }
	},
	async toShowInfoIndever() {
		let app = this;
		console.log(`app.indev: ${app.indev}`);
		console.log(`app.prefs.indev: ${app.prefs.indev}`);
		console.log(`current env is: ${app.indev ? "development" : "production"}`);
	},
};

export { indever };
