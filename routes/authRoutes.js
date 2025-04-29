const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const usersController = require("../controllers/usersController");
const { validateLogin, validateSignup, validationChecker } = require("../validators/authValidator");

// Routes d'authentification
router.get("/login", authController.login);
router.post("/login", validateLogin, validationChecker, authController.authenticate);
router.get("/logout", authController.logout, usersController.redirectView);
router.get("/signup", authController.signup);
router.post("/signup", validateSignup, validationChecker, authController.register, usersController.redirectView);

module.exports = router;