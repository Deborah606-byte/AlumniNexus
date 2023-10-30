const express = require("express");
const eventsRouter = express.Router();
const { createEvent } = require("../../controllers/eventControllers");

eventsRouter.post("/", createEvent);

module.exports = eventsRouter;
