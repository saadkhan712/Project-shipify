const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Example route accessible only by Admin
router.get("/admin", authMiddleware("Admin"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// Example route accessible by Admin and Dispatcher
router.get(
  "/dispatcher",
  authMiddleware(["Admin", "Dispatcher"]),
  (req, res) => {
    res.json({ message: "Welcome, Dispatcher or Admin!" });
  }
);

module.exports = router;
