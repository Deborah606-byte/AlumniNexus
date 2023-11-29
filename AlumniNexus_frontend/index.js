const express = require("express");
const flash = require("flash-express");
const path = require("path");
const mustache = require("mustache-express");

const app = express();

// Configure Mustache as the template engine
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// Serve static files
const public = path.join(__dirname, "public");
app.use(express.static(public));

// Parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

// Frontend routes
const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const loginRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const detailRoutes = require("./routes/detailRoutes");
const job = require("./routes/jobRoutes");
const alumniStories = require("./routes/storiesRoutes");
const registerEvent = require("./routes/rsvpRoutes");
const jobDetails = require("./routes/jobDetailsRoutes");

//public
app.use("/", aboutRoutes);
app.use("/about", aboutRoutes);
app.use("/auth", loginRoutes);

//private
app.use("/home", homeRoutes);
app.use("/dashboard", userRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRoutes);
app.use("/details", detailRoutes);
app.use("/opportunity", job);
app.use("/stories", alumniStories);
app.use("/rsvp", registerEvent);
app.use("/jobdetails", jobDetails);

// // Handle 404 errors
// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .sendFile(path.join(__dirname, "../../public", "pages", "404.html"));
// });

// Start the server
app.listen(3000, () => console.log("Server started and running on port 3000"));
