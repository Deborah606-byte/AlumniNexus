const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../../controllers/userControllers");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);

userRouter.post("/:username", updateUser);

module.exports = userRouter;
