const express = require("express");
const router = express.Router();
const { getMyProfile } = require("../controllers/usersControllers");
const { verifyToken } = require("../middlewares/auth");

router.get("/profile", verifyToken, getMyProfile);

module.exports = router; 