import crypto from "node:crypto";

import { cutil } from "@ghasemkiani/base";
import { Inputter } from "@ghasemkiani/io";

const signer = {
  defaultPrefsSigner: {
    signingKey: null,
  },
  get signingKey() {
    if (cutil.na(this.prefs.signingKey)) {
        this.prefs.signingKey = crypto.randomBytes(32).toString("hex");
    }
    return Buffer.from(this.prefs.signingKey, "hex");
  },
  set signingKey(signingKey) {
    if (Buffer.isBuffer(signingKey)) {
      this.prefs.signingKey = signingKey.toString("hex");
    } else {
      this.prefs.signingKey = signingKey;
    }
  },
  async toDefineInitOptionsSigner() {
    let app = this;
    app.commander.option("--set-signing-key <signingKey>", "set signing key persistently");
		app.commander.command("reveal-signing-key")
			.description("reveal the app's signing key")
			.option("-y, --yes", "do not ask for confirmation when revealing the signing key")
			.action(async ({ yes }, command) => {
				app.sub("run", async () => {
					await app.toRevealSigningKey({ yes });
				})
			});
  },
  async toApplyInitOptionsSigner() {
    let app = this;
    let opts = app.commander.opts();
    if (cutil.a(opts.setSigningKey)) {
      app.signingKey = opts.setSigningKey;
    }
  },
  async toRevealSigningKey({ yes }) {
    let app = this;
    yes ||= await Inputter.toConfirm("Are you sure you want to reveal the signing key of the application?");
    if (yes) {
      console.log(`the app's signing key: ${app.signingKey.toString("hex")}`);
    }
  },
};

export { signer };
