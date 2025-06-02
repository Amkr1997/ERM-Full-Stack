const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyAuth,
  privateRoute,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/private", verifyAuth, privateRoute);
router.get("/get/all/users", getAllUsers);
router.post("/update/user/:id", updateUser);
router.delete("/delete/user/:id", deleteUser);

module.exports = router;
