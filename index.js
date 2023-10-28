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
const connectDB = require("./utils/util");

//events
const userController = require("./controllers/userControllers");
// const eventsRouter = require("./routes/backendroutes/eventRoutes");
// const eventController = require("./controllers/eventControllers");

//backend routes
const alumniAdminRoutes = require("./routes/backendroutes/userRoutes");

const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static pages
app.use("/", aboutRoutes);
app.use("/home", homeRoutes);
app.use("/auth", loginRoutes);
app.use("/about", aboutRoutes);
app.use("/dashboard", userRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRoutes);
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public", "pages", "about.html"));
// });

app.use("/newAlumni", userController.createUser);
app.use("/alumniAdmin", alumniAdminRoutes);
app.get("/alumniAdmin", userController.getAllUsers);
//database routes
connectDB();

app.listen(3000, () => console.log(`server started and running on port 3000`));
