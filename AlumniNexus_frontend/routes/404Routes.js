const express = require("express");
const router = express.Router();
const path = require("path");

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "404.html"));
});

module.exports = router;