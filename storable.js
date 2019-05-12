//	@ghasemkiani/baseapp/storable

const fs = require("fs");

const {cutil} = require("@ghasemkiani/commonbase/cutil");

const storable = {
	_storeFile: null,
	_store: null,
	defaultStore: {},
	get storeFile() {
		if(!this._storeFile) {
			this._storeFile = path.join(path.dirname(module.filename), "data.json");
		}
		return this._storeFile;
	},
	set storeFile(storeFile) {
		this._storeFile = storeFile;
	},
	get store() {
		if(!this._store) {
			this.readStore();
			process.on("exit", () => this.writeStore());
		}
		return this._store;
	},
	set store(store) {
		this._store = store;
	},
	readStore() {
		try {
			this._store = JSON.parse(fs.readFileSync(this.storeFile, {encoding: "UTF-8"}));
		} catch(e) {
			console.log("Error in readStore:\n" + e.message);
		}
		if(cutil.isNil(this._store)) {
			this._store = this.defaultStore;
		}
	},
	writeStore() {
		try {
			fs.writeFileSync(this.storeFile, JSON.stringify(this._store), {encoding: "UTF-8"});
		} catch(e) {
			console.log("Error in writeStore:\n" + e.message);
		}
	},
};

module.exports = {storable};
