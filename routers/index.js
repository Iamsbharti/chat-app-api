const express = require("express");
const { test, register } = require("../controllers/registrationControl");
const { login } = require("../controllers/loginControl");
const router = express.Router();

router.get("/test", test);
router.post("/register", register);
router.post("/login", login);
module.exports = router;
