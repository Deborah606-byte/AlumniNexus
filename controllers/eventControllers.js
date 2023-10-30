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

const getMyEvents = async (req, res) => {
  try {
    const alumniEvents = await Event.find({});

    // Adding date manipulation logic to each event
    const events = alumniEvents.map((event) => {
      const dateArray = new Date(event.eventDate).toDateString().split(" ");
      const eventMonth = dateArray[1];
      const eventDay = dateArray[2];
      const eventYear = dateArray[3];
      return { ...event._doc, eventMonth, eventDay, eventYear };
    });
    console.log(events);

    res.render("dashboard", { alumniEvents: events });
  } catch (error) {
    console.error("An error occurred");
    console.error({ errors: error });
    res.status(500).send("Error fetching events");
  }
};

const updateMyEvent = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update cannot be empty" });
    }

    const username = req.params.username;

    const event = await Event.findOneAndUpdate(
      { username: username },
      req.body,
      {
        new: true,
      }
    );

    console.log("Updated event:", event);

    if (!event) {
      return res.status(404).send({
        message: `Cannot update event with id ${username}. Event not found!`,
      });
    } else {
      res.flash("success_msg", "Event updated successfully");
      res.redirect("/alumni-events");
    }
  } catch (error) {
    console.error("An error occurred");
    console.error({ error });
    res.status(500).send({ message: "Error updating event" });
  }
};

module.exports = {
  createEvent,
  getMyEvents,
  updateMyEvent,
};
