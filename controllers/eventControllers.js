const eventDB = require("../models/eventModel");
const mustache = require("mustache-express");

const getAllEvents = (req, res) => {
  eventDB.find({}, (err, events) => {
    if (err) return console.log({ errors: err });

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
};
