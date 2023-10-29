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

// Connect to the database
const connectDB = require("./utils/util");
connectDB();

// Frontend routes
const homeRoutes = require("./routes/frontendroutes/homeRoutes");
const aboutRoutes = require("./routes/frontendroutes/aboutRoutes");
const loginRoutes = require("./routes/frontendroutes/auth");
const userRoutes = require("./routes/frontendroutes/userRoutes");
const adminRoutes = require("./routes/frontendroutes/adminRoutes");
const eventRoutes = require("./routes/frontendroutes/eventRoutes");

app.use("/", aboutRoutes);
app.use("/home", homeRoutes);
app.use("/auth", loginRoutes);
app.use("/about", aboutRoutes);
app.use("/dashboard", userRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRoutes);

// Backend routes
const alumniAdminRoutes = require("./routes/backendroutes/userRoutes");
const alumniEvents = require("./routes/backendroutes/eventRoutes");
const userController = require("./controllers/userControllers");
const eventController = require("./controllers/eventControllers");

// app.use("/dashboard", alumniCreatedEvent);
app.use("/users", alumniAdminRoutes);

//Create a new event using a POST request
app.post("/newEvent", eventController.createEvent);

// Start the server
app.listen(3000, () => console.log("Server started and running on port 3000"));
