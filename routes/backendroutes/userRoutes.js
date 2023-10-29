const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../../controllers/userControllers");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);

userRouter.post("/:username", updateUser);
userRouter.post("/:username", deleteUser);

module.exports = userRouter;
