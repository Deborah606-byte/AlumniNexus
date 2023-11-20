const express = require("express");
const flash = require("flash-express");
// const path = require("path");
// const mustache = require("mustache-express");

const app = express();

// Parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

// Connect to the database
const connectDB = require("./config/dbconfig");
connectDB();

// Backend routes
const alumniUsersRoutes = require("./routes/userRoutes");
const alumniEvents = require("./routes/eventRoutes");

app.use("/users", alumniUsersRoutes);

app.use("/alumni-events", alumniEvents);

app.listen(4000, () => console.log("Server started and running on port 4000"));
