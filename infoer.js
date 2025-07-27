import { cutil } from "@ghasemkiani/base";

const infoer = {
  defaultPrefsInfoer: {},
  async toDefineInitOptionsInfoer() {
    let app = this;
    app.commander
      .command("info")
      .description("show app info")
      .action(async () => {
        app.sub("run", async () => {
          await app.toShowInfo();
        });
      });
  },
  async toApplyInitOptionsInfoer() {},
  async toShowInfo() {},
  async toShowInfoInfoer() {
    let app = this;
    console.log(`app.prefsFile: ${app.prefsFile}`);
  },
};

export { infoer };
