import { cutil } from "@ghasemkiani/base";

const dumper = {
  defaultPrefsDumper: {},
  async toDefineInitOptionsDumper() {
    this.commander.option("--dump", "Show the preference");
  },
  async toApplyInitOptionsDumper() {
    let app = this;
    let opts = app.commander.opts();
    if (cutil.a(opts.dump)) {
      app.sub("run", async () => {
        await app.toDumpPrefs();
      });
    }
  },
  async toDumpPrefs() {
    let app = this;
    console.log(app.prefsFile);
    console.log(JSON.stringify(app.prefs, null, 2));
  },
};

export { dumper };
