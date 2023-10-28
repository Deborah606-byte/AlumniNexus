const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
} = require("../../controllers/userControllers");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
