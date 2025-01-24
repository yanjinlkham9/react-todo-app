const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

// GET /api-server
router.get("/", controller.getIndex);

// GET /api-server/user
router.get("/user", controller.getUser);

module.exports = router;
