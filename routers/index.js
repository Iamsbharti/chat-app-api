const express = require("express");
const { test, register } = require("../controllers/registrationControl");
const router = express.Router();

router.get("/test", test);
router.post("/register", register);
module.exports = router;
