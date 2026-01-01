import path from "node:path";
import url from "node:url";

import { cutil } from "@ghasemkiani/base";
import { Textual } from "@ghasemkiani/base";

const pathable = {
  urlBase: null,
  _dirBase: null,
	get dirBase() {
		if (cutil.na(this._dirBase)) {
			this._dirBase = path.dirname(url.fileURLToPath(this.urlBase));
		}
		return this._dirBase;
	},
	set dirBase(dirBase) {
		this._dirBase = dirBase;
	},
  resolveString(string) {
    let app = this;
    if (cutil.a(string) && string.startsWith("@")) {
      let fn = path.resolve(app.dirBase, string.slice(1));
      string = new Textual({ fn }).read().string;
    }
    return string;
  },
};

export { pathable };
