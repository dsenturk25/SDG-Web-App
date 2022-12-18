
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Volunteer/authVolunteer/register/post");
const loginPostController = require("../controllers/Volunteer/authVolunteer/login/post");
const profileGetController = require("../controllers/Volunteer/authVolunteer/profile/get.js");

const isVolunteerAuth = require("../middleware/isVolunteerLoggedIn");

const projectJoinPostController = require("../controllers/Volunteer/project/join/post");
const projectExitPostController = require("../controllers/Volunteer/project/exit/post");

const confirmEmailGetController = require("../controllers/Volunteer/confirm/get");
const confirmEmailPostController = require("../controllers/Volunteer/authVolunteer/confirm/post");

const volunteerIndexGetController = require("../controllers/Volunteer/index/index/get");
const isVolunteerEmailConfirmed = require("../middleware/isVolunteerEmailConfirmed");
const resendCodePostController = require("../controllers/Volunteer/authVolunteer/update/confirmation_code/post");

router.use(express.json());

router.get(
  "/", 
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  volunteerIndexGetController
)

router.get(
  "/profile", 
  isVolunteerAuth,
  profileGetController
);

router.post(
  "/register",
  registerPostController
);

router.post(
  "/login",
  loginPostController
);

router.get(
  "/email_confirm",
  isVolunteerAuth,
  confirmEmailGetController
)

router.post(
  "/auth/email_confirm",
  isVolunteerAuth,
  confirmEmailPostController
)

router.post(
  "/auth/resend_code",
  isVolunteerAuth,
  resendCodePostController
)

router.post(
  "/project/join",
  isVolunteerAuth,
  projectJoinPostController
);

router.post(
  "/project/exit",
  isVolunteerAuth,
  projectExitPostController
);

module.exports = router;
