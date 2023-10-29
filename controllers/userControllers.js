const User = require("../models/userModel");

const createUser = async (req, res) => {
  const signUpData = req.body;
  try {
    const newAlumni = await User.create(signUpData);
    console.log({ message: "Member added successfully", newAlumni });
    res.status(200).send("Sign up made successfully");
  } catch (error) {
    console.error("An error occurred");
    console.error({ error: err });
    res.status(500).send("Error creating user");
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

// Add a new controller function to handle user updates
const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    console.log("ID:", id);
    console.log("Request Body:", req.body);

    const data = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    console.log("Updated Data:", data);

    if (!data) {
      res.status(404).send({
        message: `Cannot update user with ${id}. Maybe user not found!`,
      });
    } else {
      res.send(data);
    }
  } catch (err) {
    console.error("An error occurred");
    console.error({ errors: err });
    res.status(500).send({ message: "Error updating user information" });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
