const express = require("express");
const path = require("path");
const app = express();

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// require fontend routes
const homeRoutes = require("./routes/frontendroutes/homeRoutes");
const aboutRoutes = require("./routes/frontendroutes/aboutRoutes");
const loginRoutes = require("./routes/frontendroutes/auth");
const userRoutes = require("./routes/frontendroutes/userRoutes");
const adminRoutes = require("./routes/frontendroutes/adminRoutes");
const eventRoutes = require("./routes/frontendroutes/eventRoutes");

//require backend routes
const userBackendRoutes = require("./routes/backendroutes/userRoutes");
const userEventRoutes = require("./routes/backendroutes/eventRoutes");

//events
const eventController = require("./controllers/eventControllers");
const userController = require("./controllers/userControllers");

const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static pages
app.use("/", aboutRoutes);
app.use("/home", homeRoutes);
app.use("/auth", loginRoutes);
app.use("/about", aboutRoutes);
// app.use("/dashboard", userRoutes);
// app.use("/admin", adminRoutes);
// app.use("/events", eventRoutes);
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public", "pages", "about.html"));
// });

//database routes
app.use("/users", userBackendRoutes);
app.use("/events", userEventRoutes);

// Define the view route
app.get("/dashboard", eventController.getUserEvents);
app.get("/admin", eventController.getAllEvents);
app.get("/events", eventController.getAllEvents);
app.get("/admin", userController.getAllUsers);

app.listen(3000, () => console.log(`server started and running on port 3000`));
