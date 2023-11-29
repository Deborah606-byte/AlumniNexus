const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {
  console.log("Request to /login");
  res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
});
router.get("/signup", (req, res) => {
  console.log("Request to /signup");
  res.sendFile(path.join(__dirname, "../public", "pages", "signup.html"));
});

module.exports = router;
