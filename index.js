const express = require("express");
const path = require("path");
const app = express();

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// require routes
const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const loginRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

//backend routes
const userBackendRoutes = require("./routes/backendroutes/userRoutes");
const userEventRoutes = require("./routes/backendroutes/eventRoutes");

//events
const eventController = require("./controllers/eventControllers");

const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//views
app.use("/", aboutRoutes);
app.use("/home", homeRoutes);
app.use("/auth", loginRoutes);
app.use("/about", aboutRoutes);
app.use("/dashboard", userRoutes);
app.use("/admin", adminRoutes);
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public", "pages", "about.html"));
// });

//database routes
app.use("/users", userBackendRoutes);
app.use("/events", userEventRoutes);

// Define the dashboard route
app.get("/dashboard", eventController.getAllEvents);

app.listen(3000, () => console.log(`server started and running on port 3000`));
