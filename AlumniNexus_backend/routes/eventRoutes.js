const express = require("express");
const eventsRouter = express.Router();
const {
  createEvent,
  getMyEvents,
  updateMyEvent,
  deleteMyEvent,
} = require("../controllers/eventControllers");

eventsRouter.post("/", createEvent);
eventsRouter.get("/", getMyEvents);
eventsRouter.post("/:username", updateMyEvent);
eventsRouter.post("/delete/:username", deleteMyEvent);

module.exports = eventsRouter;
