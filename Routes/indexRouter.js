
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const registerGetController = require("../controllers/index/register/get");
const loginGetController = require("../controllers/index/login/get");
const projectGetController = require("../controllers/index/project/get");
const myProjectsGetController = require("../controllers/index/myProjects/get");
const searchBarPostController = require("../controllers/index/search/post");
const leaderboardGetController = require("../controllers/index/leaderboard/get")
const hoursOfServiceGoalPostController = require("../controllers/index/hoursOfServiceGoal/post");

const isVolunteerLoggedIn = require("../middleware/isVolunteerLoggedIn");
const isEmailConfirmed = require("../middleware/isVolunteerEmailConfirmed");
const isAccountCompleted = require("../middleware/isVolunteerCompleted");

const projectLikePostController = require("../controllers/index/project/like/post");

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

router.post(
  "/project/like",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  projectLikePostController
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
  "/leaderboard",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  leaderboardGetController
)

router.post(
  "/hoursOfServiceGoal/update",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  hoursOfServiceGoalPostController
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
