const express = require("express");
const router = express.Router();
const validateStudent = require("../middleware/validator");
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { adminValidator } = require("../middleware/adminvalidation");

router.get("/", adminValidator, getAllStudents);

router.post("/", validateStudent, adminValidator, addStudent);

router.put("/:id", validateStudent, adminValidator, updateStudent);

router.delete("/:id", adminValidator, deleteStudent);

module.exports = router;
