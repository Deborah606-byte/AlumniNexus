const User = require("../models/userModel");

const createUser = async (req, res) => {
  const signUpData = req.body;
  try {
    const newAlumni = await User.create(signUpData);
    console.log({ message: "Event created successfully", newAlumni });
    res.redirect("/auth/signup");
  } catch (error) {
    console.error("An error occurred");
    console.error({ error: err });
    res.status(500).send("Error creating event");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const alumniUsers = await User.find({}); // Fetch all users
    res.render("admin", { alumniUsers });
  } catch (err) {
    console.error("An error occurred");
    console.error({ errors: err });
    res.status(500).send("Error fetching users");
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
