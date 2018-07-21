//	@ghasemkiani/baseapp/encdec

const path = require("path");
const fs = require("graceful-fs");
const getHomedir = require("os-homedir");
const crypto = require("crypto");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

const encdec = {
  _encKeyPath: null,
  get encKeyPath() {
    if(!this._encKeyPath) {
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
    if(!this._encKey) {
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
    if(!this.encKey) {
      throw new Error("Encryption key not found!");
    }
    let cipher = crypto.createCipher("aes128", this.encKey);
    return cipher.update(Buffer.from(text).toString("utf8"), "utf8", "hex") + cipher.final("hex");
  },
  decrypt(text) {
    if(!this.encKey) {
      throw new Error("Encryption key not found!");
    }
    let decipher = crypto.createDecipher("aes128", this.encKey);
    return decipher.update(cutil.asString(text), "hex", "utf8") + decipher.final("utf8");
  },
};

module.exports = {encdec};
