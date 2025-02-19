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
router.post("/auth/register", hashPassword, register);
router.post("/auth/login", getUserByEmailMiddleWare, verifyPassword);

// Private routes
const usersControllers = require("./controllers/usersControllers");

router.get("/profile", verifyToken, usersControllers.getMyProfile);

// Articles routes
const articlesControllers = require("./controllers/articlesControllers");

router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);
router.post("/articles", verifyToken, articlesControllers.add);
router.put("/articles/:id", verifyToken, articlesControllers.edit);
router.delete("/articles/:id", verifyToken, articlesControllers.destroy);

// Categories routes
const categoriesControllers = require("./controllers/categoriesControllers");

router.get("/categories", categoriesControllers.browse);
router.get("/categories/:id", categoriesControllers.read);

module.exports = router;
