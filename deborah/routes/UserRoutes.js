const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  deleteUser,
  updateUser,
  getCurrentUser,
  getUserById,
  getAllUsers,
} = require("../controllers/UserController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me/:token", getCurrentUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
