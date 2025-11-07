import { cutil } from "@ghasemkiani/base";

const infoer = {
  defaultPrefsInfoer: {},
  async toDefineInitOptionsInfoer() {
    let app = this;
    app.commander
      .command("info")
      .alias("?")
      .description("show app info")
      .action(async () => {
        app.sub("run", async () => {
          await app.toShowInfo();
        });
      });
  },
  async toApplyInitOptionsInfoer() {},
  async toShowInfo() {
    let app = this;
    await app.toShowInfoInfoer();
  },
  async toShowInfoInfoer() {
    let app = this;
    console.log(`app.prefsFile: ${app.prefsFile}`);
  },
};

export { infoer };
