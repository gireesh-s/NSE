const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: String,
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.methods.validPassword = (password, salt, passwordData) => {
    var password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return passwordData === password;
  };
  
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};
  
module.exports = mongoose.model("User", userSchema);