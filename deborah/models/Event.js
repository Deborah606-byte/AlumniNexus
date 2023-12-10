const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  eventCategory: {
    type: String,
    required: true,
    enum: ["None", "Professional Development", "Networking", "Campus Events"],
  },
  eventName: {
    type: String,
    required: true,
  },
  eventSpeaker: {
    type: [String],
    required: true,
  },
  eventAgenda: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventDuration: {
    type: Number,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  }
});

module.exports = mongoose.model("Event", EventSchema);
