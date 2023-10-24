const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoLinks: {
    type: [String],
    default: [],
  },
  duration: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
