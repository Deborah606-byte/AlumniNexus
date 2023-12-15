require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUploads = require("express-fileupload");

const userRoutes = require("./routes/UserRoutes.js");
const eventRoutes = require("./routes/EventRoutes.js");
const rsvpRoutes = require("./routes/RsvpRoutes.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUploads({ useTempFiles: true, tempFileDir: "/tmp" }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://thealumni-nexus.vercel.app",
];
const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || origin == undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rsvp", rsvpRoutes);
//Add routers here

app.get("/", (req, res) => {
  res.status(200).send("Hello World, Deborah here!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
