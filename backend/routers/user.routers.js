const express = require("express");
const router = express.Router();

const userController = require("./../controllers/users.controller");

router.post("/login", userController.loginUser);
router.post("/signup", userController.signUpUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
