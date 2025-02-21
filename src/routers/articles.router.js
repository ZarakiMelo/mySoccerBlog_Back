const express = require("express");
const router = express.Router();
const { browse, read, edit, add, destroy } = require("../controllers/articlesControllers");
const { verifyToken } = require("../middlewares/auth");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", verifyToken, edit);
router.post("/", verifyToken, add);
router.delete("/:id", verifyToken, destroy);

module.exports = router; 