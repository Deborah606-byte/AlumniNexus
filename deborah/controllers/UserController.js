const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const {
    username,
    phone,
    email,
    password,
    firstName,
    lastName,
    address,
    role,
  } = req.body;

  try {
    //Check if user already exists
    let existing_user = await User.findOne({ email: email });

    if (existing_user) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "User with email already exists",
        },
      });
    }

    //Check if username already exists
    let existing_username = await User.findOne({ username: username });

    if (existing_username) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "User with username already exists",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      role,
    });

    const savedUser = await newUser.save();

    //Return user without password at all
    savedUser.password = undefined;

    res.status(200).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "Please provide username and password",
        },
      });
    }

    let user = null;

    //Find user by username without his password
    user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "Invalid username or password",
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "Invalid username or password",
        },
      });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
    });

    user.password = undefined;
    res.status(200).json({
      message: "success",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({
    message: "success",
    data: {
      message: "Logged out successfully",
    },
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCurrentUser = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({
      message: "fail",
      data: {
        message: "Please login",
      },
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = decoded;

  try {
    let user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "fail",
        data: {
          message: "User not found",
        },
      });
    }

    res.status(200).json({
      message: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is found, return the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  deleteUser,
  getCurrentUser,
  getUserById,
};
