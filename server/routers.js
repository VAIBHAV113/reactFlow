const express = require("express");
const router = express.Router();
const PositionController = require("./positionController");

router.post("/post", PositionController.apiCreateSchema);

module.exports = router;
