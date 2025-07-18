const express = require("express");
const router = express.Router();
const MentorsController = require("../controllers/MentorsController");

router.get("/", MentorsController.getAll);

module.exports = router;