
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
const learnGetController = require("../controllers/index/learn/get");

const isVolunteerLoggedIn = require("../middleware/isVolunteerLoggedIn");
const isEmailConfirmed = require("../middleware/isVolunteerEmailConfirmed");
const isAccountCompleted = require("../middleware/isVolunteerCompleted");

const projectLikePostController = require("../controllers/index/project/like/post");

const calendarGetController = require("../controllers/index/calendar/get.js");
const calendarDataGetController = require("../controllers/index/calendar/data/get.js");

router.get(
  "/",
  indexGetController
)

router.get(
  "/project",
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
  "/learn",
  learnGetController
)

router.get(
  "/login",
  loginGetController
)

router.get(
  "/register",
  registerGetController
)

router.get(
  "/calendar",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  calendarGetController
)

router.get(
  "/calendar/data",
  isVolunteerLoggedIn,
  isEmailConfirmed,
  isAccountCompleted,
  calendarDataGetController
)

module.exports = router;
