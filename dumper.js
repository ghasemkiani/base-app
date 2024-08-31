import { cutil } from "@ghasemkiani/base";

const dumper = {
  async toDefineInitOptionsDumper() {
    this.commander.option("--dump", "Show the preference");
  },
  async toApplyInitOptionsDumper() {
    let app = this;
    let opts = app.commander.opts();
    if (cutil.a(opts.dump)) {
      app.sub("run", () => {
        console.log(app.prefsFile);
        console.log(JSON.stringify(app.prefs, null, 2));
      });
    }
  },
};

export { dumper };
