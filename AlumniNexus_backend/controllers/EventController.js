const Event = require("../models/Event");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
  //authenticate
  const {
    eventCategory,
    eventName,
    eventSpeaker1,
    eventSpeaker2,
    eventAgenda,
    eventDescription,
    eventDate,
    eventTime,
    eventDuration,
    eventLocation,
    userId,
  } = req.body;
  const image = req.files?.file
  
  try {
    const result = await cloudinary.uploader.upload(image?.tempFilePath, {
      folder: "events",
      resource_type: "auto",
      // width: 300,
      // crop: "scale"
    })
    const eventData = new Event({
      eventCategory,
      eventName,
      eventSpeaker: [eventSpeaker1, eventSpeaker2],
      eventAgenda,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
      eventDescription,
      eventDate,
      eventTime,
      eventDuration,
      eventLocation,
      userId,
    });

    const newEvent = await eventData.save();
    console.log({ message: "Event added successfully", newEvent });
    res.status(200).json("Event added successfully");
  } catch (error) {
    console.error("An error occurred");
    console.error({ error: error });
    res.status(500).send("Error creating event");
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    eventCategory,
    eventName,
    eventSpeaker1,
    eventSpeaker2,
    eventAgenda,
    eventDescription,
    eventDate,
    eventTime,
    eventDuration,
    eventLocation,
  } = req.body;

  const image = req.files?.file
  try {
    const result = await cloudinary.uploader.upload(image?.tempFilePath, {
      folder: "events",
      resource_type: "auto",
      // width: 300,
      // crop: "scale"
    })
    const event = await Event.findByIdAndUpdate(
      id,
      {
        eventCategory,
        eventName,
        eventSpeaker: [eventSpeaker1, eventSpeaker2],
        eventAgenda,
        image: {
          public_id: result.public_id,
          url: result.secure_url
        },
        eventDescription,
        eventDate,
        eventTime,
        eventDuration,
        eventLocation,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const allEvents = await Event.find();

    res.status(200).json({
      message: "All events retrieved successfully",
      events: allEvents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getMyEvents = async (req, res) => {
  const userId = req.params.userId;

  try {
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = {
  create,
  updateEvent,
  deleteEvent,
  getAllEvent,
  getMyEvents,
};
