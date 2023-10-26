const eventDB = require("../models/eventModel");
const mustache = require("mustache-express");

const getAllEvents = (req, res) => {
  eventDB.find({}, (err, data) => {
    if (err) return console.log({ errors: err });

    const events = data.map((event) => {
      const dateArray = new Date(event.eventDate).toDateString().split(" ");
      const eventMonth = dateArray[1];
      const eventDay = dateArray[2];
      const eventYear = dateArray[3];
      // console.log({date});
      return { ...event, eventMonth, eventDay, eventYear };
    });
    console.log(events);
    // Render the "dashboard" view with the events data
    res.render("admin", { events });
  });
};

const getUserEvents = (req, res) => {
  eventDB.find({ username: "Deborah_Paintsil" }, (err, data) => {
    if (err) return console.log({ errors: err });

    const events = data.map((event) => {
      const dateArray = new Date(event.eventDate).toDateString().split(" ");
      const eventMonth = dateArray[1];
      const eventDay = dateArray[2];
      const eventYear = dateArray[3];
      // console.log({date});
      return { ...event, eventMonth, eventDay, eventYear };
    });
    console.log(events);
    // Render the "dashboard" view with the events data
    res.render("dashboard", { events });
  });
};

const createEvent = (req, res) => {
  const eventData = req.body;
  eventDB.insert(eventData, (err, data) => {
    if (err) {
      console.log("An error occured");
      return console.log({ error: err });
    }
    console.log({ message: "data inserted successfully", data });
    console.log(eventData);
    res.redirect("/dashboard");
  });
};

module.exports = {
  getAllEvents,
  createEvent,
  getUserEvents,
};
