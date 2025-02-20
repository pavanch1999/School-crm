const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin-data", verifyToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Admin Dashboard Data" });
});

router.get("/teacher-data", verifyToken, checkRole(["teacher"]), (req, res) => {
  res.json({ message: "Teacher Dashboard Data" });
});

router.get("/student-data", verifyToken, checkRole(["student"]), (req, res) => {
  res.json({ message: "Student Dashboard Data" });
});

module.exports = router;
