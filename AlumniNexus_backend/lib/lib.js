const Event = require("../models/eventModel");

exports.getEvents = async (req, res) => {
  try {
    const alumniEvents = await Event.find({});
    // Adding date manipulation logic to each event
    const events = alumniEvents.map((event) => {
      const dateArray = new Date(event.eventDate).toDateString().split(" ");
      const eventMonth = dateArray[0];
      const eventDay = dateArray[1];
      const eventYear = dateArray[2];
      return { ...event._doc, eventMonth, eventDay, eventYear };
    });
    res.status(200).json(events);
  } catch (error) {
    console.error("An error occurred");
    console.error({ errors: error });
    res.status(500).send("Error fetching events");
  }
};

exports.updateMyEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).send({
        message: `Cannot update event with id ${id}. Event not found!`,
      });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("An error occurred");
    console.error({ error });
    res.status(500).send("Error updating event");
  }
};

exports.deleteMyEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndRemove(id);
    if (!deletedEvent) {
      return res.status(404).send({
        message: `Cannot delete event with id: ${id}. Event not found!`,
      });
    }
    res.status(200).send("Event deleted successfully");
  } catch (error) {
    console.error("An error occurred");
    console.error({ error });
    res.status(500).send("Error deleting event");
  }
};
