const Course = require("../models/course.model");

// Controller function to get all courses with limited fields
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, "name description duration");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a course by its ID
exports.getCourseById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
