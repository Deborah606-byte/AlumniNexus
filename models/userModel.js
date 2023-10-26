const Datastore = require("nedb");
const userDB = new Datastore({
  filename: "db/user.db",
  corruptAlertThreshold: 1,
  autoload: true,
});

module.exports = userDB;
