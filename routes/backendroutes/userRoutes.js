const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../../controllers/userControllers");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);

userRouter.put("/alumniAdmin/:id", updateUser);

module.exports = userRouter;
