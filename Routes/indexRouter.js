
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const registerGetController = require("../controllers/index/register/get");
const loginGetController = require("../controllers/index/login/get");
const projectGetController = require("../controllers/index/project/get");
const myProjectsGetController = require("../controllers/index/myProjects/get");
const searchBarPostController = require("../controllers/index/search/post")

const isVolunteerLoggedIn = require("../middleware/isVolunteerLoggedIn");
const isEmailConfirmed = require("../middleware/isVolunteerEmailConfirmed");
const isAccountCompleted = require("../middleware/isVolunteerCompleted");

router.get(
  "/",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  indexGetController
)

router.get(
  "/project",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  projectGetController
)

router.get(
  "/my-projects",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  myProjectsGetController
)

router.post(
  "/search-query",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  searchBarPostController
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
