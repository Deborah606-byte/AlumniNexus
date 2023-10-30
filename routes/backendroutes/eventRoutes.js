const express = require("express");
const eventsRouter = express.Router();
const {
  createEvent,
  getMyEvents,
  updateMyEvent,
} = require("../../controllers/eventControllers");

eventsRouter.post("/", createEvent);
eventsRouter.get("/", getMyEvents);
eventsRouter.post("/:username", updateMyEvent);

module.exports = eventsRouter;
