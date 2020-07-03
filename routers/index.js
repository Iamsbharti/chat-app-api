const express = require("express");
const { test, register } = require("../controllers/registrationControl");
const { login } = require("../controllers/loginControl");
const { getAllUsers } = require("../controllers/allUsersControl");
const { isAuthorized } = require("../middlewares");
const router = express.Router();

router.get("/test", test);
router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", isAuthorized, getAllUsers);
module.exports = router;
