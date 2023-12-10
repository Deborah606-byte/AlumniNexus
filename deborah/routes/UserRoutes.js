const express = require("express");
const router = express.Router();

const {signup, login, logout, deleteUser, getCurrentUser, getUserById} = require("../controllers/UserController");

router.post("/signup", signup);
router.post("/login", login);   
router.get("/logout", logout);
router.get("/me/:token", getCurrentUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);


module.exports = router;