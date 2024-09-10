import os from "node:os";
import path from "node:path";
import fs from "node:fs";

import { cutil } from "@ghasemkiani/base";

const storable = {
  // prefsId: "app.tmp",
  _storeFile: null,
  _store: null,
  defaultStore: {},
  autoSaveStore: true,
  getDefaultStoreFile() {
    return path.join(
      os.homedir(),
      `.${this.prefsId}`,
      `${this.prefsId}.store.json`,
    );
  },
  get storeFile() {
    if (!this._storeFile) {
      this._storeFile = this.getDefaultStoreFile();
    }
    return this._storeFile;
  },
  set storeFile(storeFile) {
    this._storeFile = storeFile;
  },
  get store() {
    if (!this._store) {
      this.readStore();
      if (this.autoSaveStore) {
        process.on("exit", () => this.writeStore());
      }
    }
    return this._store;
  },
  set store(store) {
    this._store = store;
  },
  readStore() {
    try {
      this._store = JSON.parse(
        fs.readFileSync(this.storeFile, { encoding: "UTF-8" }),
      );
    } catch (e) {
      console.log("Error in readStore:\n" + e.message);
    }
    if (cutil.isNil(this._store)) {
      this._store = this.defaultStore;
    }
  },
  writeStore() {
    try {
      fs.writeFileSync(this.storeFile, JSON.stringify(this._store, null, 2), {
        encoding: "UTF-8",
      });
    } catch (e) {
      console.log("Error in writeStore:\n" + e.message);
    }
  },
};

export { storable };
