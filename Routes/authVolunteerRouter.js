
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Volunteer/authVolunteer/register/post");
const loginPostController = require("../controllers/Volunteer/authVolunteer/login/post");
const profileGetController = require("../controllers/Volunteer/authVolunteer/profile/get.js");

const isVolunteerAuth = require("../middleware/isVolunteerLoggedIn");

router.use(express.json());

router.get(
  "/profile", 
  isVolunteerAuth,
  profileGetController
)

router.post(
  "/register",
  registerPostController
);

router.post(
  "/login",
  loginPostController
)

module.exports = router;
