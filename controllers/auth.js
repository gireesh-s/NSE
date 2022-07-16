const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt");

exports.signup = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Server error",
      });
    } else if (user) {
      return res.status(400).json({
        error: "Account with this email already exists",
      });
    } else if (!user) {
      let newUser = new User(req.body);
      newUser.setPassword(password);
      newUser.save((error, user) => {
        if (error) {
          return res.status(400).json({
            error: "Signup Failed",
          });
        } else {
          user.password = undefined;
          return res.status(200).json({
            user,
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Email not found",
        });
      } else if (user) {
        if (!user.validPassword(password, user.salt, user.password)) {
          return res.status(401).json({
            error: "Email and Password doesn't match",
          });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2d",
        });
        res.cookie("t", token, { expire: new Date() + 9999 });
        user.salt = undefined;
        user.password = undefined;
        user.notifications = undefined;
        user.photo = undefined;
        res.json({
          token,
          user: { user },
        });
      }
    });
};
  
exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout Successful" });
};
  
exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    userProperty: "auth",
});
  
exports.isAuth = (req, res, next) => {
    let user = req.user && req.auth && req.user._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
        error: "Access Denied",
        });
    }
    next();
};