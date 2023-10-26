const Datastore = require("nedb");
const eventDB = new Datastore({
  filename: "db/events.db",
  corruptAlertThreshold: 1,
  autoload: true,
});

module.exports = eventDB;
