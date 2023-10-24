const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// Get all courses with limited fields (name, description, duration)
router.get("/courses", courseController.getAllCourses);

// Get a course by its ID
router.get("/courses/:id", courseController.getCourseById);
