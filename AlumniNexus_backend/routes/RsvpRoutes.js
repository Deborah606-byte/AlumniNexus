const express = require("express");
const router = express.Router();

const submitRSVP = require("../controllers/RsvpController");

router.post("/create", submitRSVP);

module.exports = router;
