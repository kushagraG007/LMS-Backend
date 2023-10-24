const CourseEnrollment = require("../models/courseEnrollment.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Transaction = require("../models/transaction.model");

exports.createTransaction = async (req, res) => {
  try {
    const { userId, courseId, amount, paymentType } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    // Create a new transaction
    const transaction = new Transaction({
      user: userId,
      course: courseId,
      amount,
      paymentType,
    });

    const savedTransaction = await transaction.save();

    // Enroll the student in the course
    await _createCourseEnrollment(userId, courseId);

    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Transaction creation failed" });
  }
};

// Create a new course enrollment record
const _createCourseEnrollment = async (userId, courseId) => {
  try {
    // Check if userId and courseId are provided
    if (!userId || !courseId) {
      throw new Error("User ID and Course ID are required.");
    }

    // Retrieve user from the database using studentId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // Retrieve course from the database using courseId
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found.");
    }

    // Check if the student is already enrolled in the course
    const existingEnrollment = await CourseEnrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      throw new Error("User is already enrolled in the course.");
    }

    const startDate = new Date(); // Set the start date as the current date

    const courseEnrollment = new CourseEnrollment({
      user: userId,
      course: courseId,
      startDate,
    });

    const savedCourseEnrollment = await courseEnrollment.save();

    return savedCourseEnrollment;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create course enrollment.");
  }
};

module.exports = {
  _createCourseEnrollment,
};
