const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const newEvent = await Event.create(eventData);
    console.log({ message: "Event added successfully", newEvent });
    res.status(200).send("Event added successfully");
  } catch (error) {
    console.error("An error occurred");
    console.error({ error: err });
    res.status(500).send("Error creating event");
  }
};

// const getAllEvents = async (req, res) => {
//   try {
//     const alumniEvents = await Event.find({});
//     res.render("dashboard", { alumniEvents });
//   } catch (error) {
//     console.error("An error occurred");
//     console.error({ errors: err });
//     res.status(500).send("Error fetching events");
//   }
// };

module.exports = {
  createEvent,
};
