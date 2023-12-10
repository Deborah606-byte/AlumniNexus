const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  group: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  fileUpload: {
    type: String,
  },
  role: {
    type: String,
    enum: ["alumni", "admin"],
    default: "alumni",
  },
});

module.exports = mongoose.model("User", UserSchema);
