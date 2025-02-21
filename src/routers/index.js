const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const articlesRouter = require("./articles.router");
const categoriesRouter = require("./categories.router");
const usersRouter = require("./users.router");

router.use("/auth", authRouter);
router.use("/articles", articlesRouter);
router.use("/categories", categoriesRouter);
router.use("/", usersRouter);

module.exports = router; 