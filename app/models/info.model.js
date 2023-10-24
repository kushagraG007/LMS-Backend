const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date, // You can store the date of birth as a Date object
  city: String,
  contactNumber: String,
});

const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);

module.exports = PersonalInfo;
