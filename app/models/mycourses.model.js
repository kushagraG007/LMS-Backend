const mongoose = require("mongoose");

const courseEnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for student details
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model for course details
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("CourseEnrollment", courseEnrollmentSchema);
