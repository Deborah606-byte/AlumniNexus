const express = require("express");
const router = express.Router();

const {
  create,
  updateEvent,
  deleteEvent,
  getAllEvent,
  getMyEvents,
} = require("../controllers/EventController");

router.post("/create", create);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/all", getAllEvent);
router.get("/my-events/:userId", getMyEvents);

module.exports = router;
