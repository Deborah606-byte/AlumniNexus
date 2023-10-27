const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
  email: { type: String, required: true, unique: true },
  group: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
