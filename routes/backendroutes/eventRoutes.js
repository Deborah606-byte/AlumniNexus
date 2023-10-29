const express = require("express");
const eventsRouter = express.Router();
const {
  createEvent,
  getAllEvents,
} = require("../../controllers/eventControllers");

eventsRouter.post("/", createEvent);
// eventsRouter.get("/:eventId", getEvent);
eventsRouter.get("/", getAllEvents);

module.exports = eventsRouter;
