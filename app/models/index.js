const mongoose = require("mongoose");

// Set Mongoose to use native Promise (ES6 Promise)
mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: require("./user.model"),
  role: require("./role.model"),
  ROLES: ["user", "admin", "moderator"],
  personalInfo: require("./info.model"),
};

module.exports = db;
