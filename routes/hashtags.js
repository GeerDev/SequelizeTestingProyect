const express = require("express");
const HashtagController = require("../controllers/HashtagController");
const router = express.Router();

router.post("/", HashtagController.create);

module.exports = router;
