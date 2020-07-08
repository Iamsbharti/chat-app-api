const express = require("express");
const { test, register } = require("../controllers/registrationControl");
const { login } = require("../controllers/loginControl");
const { getAllUsers } = require("../controllers/allUsersControl");
const { isAuthorized } = require("../middlewares");
const { getChatForUser } = require("../controllers/chatController");
const router = express.Router();

/**Authentication and Authorization */
router.get("/test", test);
router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", isAuthorized, getAllUsers);

/**Chat Routes */
router.get("/get/for/user", isAuthorized, getChatForUser);
module.exports = router;
