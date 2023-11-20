const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);

userRouter.post("/user/:username", updateUser);
userRouter.post("/delete/:username", deleteUser);

module.exports = userRouter;
