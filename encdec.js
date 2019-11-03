//	@ghasemkiani/baseapp/encdec

const path = require("path");
const fs = require("graceful-fs");
const getHomedir = require("os-homedir");
const crypto = require("crypto");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

const encdec = {
	_encKeyPath: null,
	get encKeyPath() {
		if (!this._encKeyPath) {
			const homedir = getHomedir();
			this._encKeyPath = path.join(homedir, ".ssh", "id_rsa");
		}
		return this._encKeyPath;
	},
	set encKeyPath(encKeyPath) {
		this._encKeyPath = encKeyPath;
	},
	_encKey: null,
	get encKey() {
		if (!this._encKey) {
			try {
				this._encKey = fs.readFileSync(this.encKeyPath).toString("utf8");
			} catch (e) {}
		}
		return this._encKey;
	},
	set encKey(encKey) {
		this._encKey = encKey;
	},
	encrypt(text) {
		if (!this.encKey) {
			throw new Error("Encryption key not found!");
		}
		let cipher = crypto.createCipher("aes128", this.encKey);
		return cipher.update(Buffer.from(text).toString("utf8"), "utf8", "hex") + cipher.final("hex");
	},
	decrypt(text) {
		if (!this.encKey) {
			throw new Error("Encryption key not found!");
		}
		let decipher = crypto.createDecipher("aes128", this.encKey);
		return decipher.update(cutil.asString(text), "hex", "utf8") + decipher.final("utf8");
	},
	enc(text) {
		if (!this.encKey) {
			throw new Error("Encryption key not found!");
		}
		let algorithm = "aes256";
		let key = crypto.createHash("md5").update(this.encKey).digest("hex");
		let iv = crypto.randomBytes(8).toString("hex");
		let cipher = crypto.createCipheriv(algorithm, key, iv);
		return iv + cipher.update(Buffer.from(text).toString("utf8"), "utf8", "hex") + cipher.final("hex");
	},
	dec(text) {
		if (!this.encKey) {
			throw new Error("Encryption key not found!");
		}
		text = cutil.asString(text);
		let algorithm = "aes256";
		let key = crypto.createHash("md5").update(this.encKey).digest("hex");
		let iv = text.substring(0, 16);
		text = text.substring(16);
		let decipher = crypto.createDecipheriv(algorithm, key, iv);
		return decipher.update(text, "hex", "utf8") + decipher.final("utf8");
	},
};

module.exports = {encdec};
