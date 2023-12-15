const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("RSVP", rsvpSchema);
