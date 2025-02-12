const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");
const {
  getUserByEmailMiddleWare,
  register,
} = require("./controllers/authControllers");

// Public routes
// Auth
router.post("/register", hashPassword, register);
router.post("/login", getUserByEmailMiddleWare, verifyPassword);

// Private routes
const usersControllers = require("./controllers/usersControllers");

router.get("/profile", verifyToken, usersControllers.getMyProfile);

// Articles routes
const articlesControllers = require("./controllers/articlesControllers");

router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);
router.put("/articles/:id", articlesControllers.edit);
router.post("/articles", articlesControllers.add);
router.delete("/articles/:id", articlesControllers.destroy);

module.exports = router;
