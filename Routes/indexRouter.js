
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const registerGetController = require("../controllers/index/register/get");
const loginGetController = require("../controllers/index/login/get");
const projectGetController = require("../controllers/index/project/get");

const isVolunteerLoggedIn = require("../middleware/isVolunteerLoggedIn");

router.get(
  "/",
  isVolunteerLoggedIn,
  indexGetController
)

router.get(
  "/project",
  isVolunteerLoggedIn,
  projectGetController
)

router.get(
  "/login",
  loginGetController
)

router.get(
  "/register",
  registerGetController
)

module.exports = router;
