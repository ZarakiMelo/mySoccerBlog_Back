const express = require("express");

const router = express.Router();

const { register, login, getUserByEmailMiddleWare } = require("../controllers/authControllers");

router.post("/register", register);
router.post("/login", getUserByEmailMiddleWare, login);

module.exports = router; 