
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Volunteer/authVolunteer/register/post");
const loginPostController = require("../controllers/Volunteer/authVolunteer/login/post");
const profileGetController = require("../controllers/Volunteer/authVolunteer/profile/get.js");
const profilePostController = require("../controllers/Volunteer/authVolunteer/profile/post");
const logoutPostController = require("../controllers/Volunteer/authVolunteer/logout/post");

const isVolunteerAuth = require("../middleware/isVolunteerLoggedIn");
const isAccountCompleted = require("../middleware/isVolunteerCompleted");

const projectJoinPostController = require("../controllers/Volunteer/project/join/post");
const projectExitPostController = require("../controllers/Volunteer/project/exit/post");

const confirmEmailGetController = require("../controllers/Volunteer/confirm/get");
const confirmEmailPostController = require("../controllers/Volunteer/authVolunteer/confirm/post");

const volunteerIndexGetController = require("../controllers/Volunteer/index/index/get");
const isVolunteerEmailConfirmed = require("../middleware/isVolunteerEmailConfirmed");
const resendCodePostController = require("../controllers/Volunteer/authVolunteer/update/confirmation_code/post");

const completeAccountGetController = require("../controllers/Volunteer/complete/get");
const completeAccountPostController = require("../controllers/Volunteer/complete/post");

const organizationGetController = require("../controllers/Volunteer/organization/get");

const organizationLikePostController = require("../controllers/Volunteer/organization/like/post");

router.use(express.json());

router.get(
  "/",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  volunteerIndexGetController
)

router.get(
  "/edit-profile",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  profileGetController
);

router.post(
  "/edit-profile",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  profilePostController
)

router.post(
  "/logout",
  isVolunteerAuth,
  logoutPostController
)

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

router.get(
  "/complete_account",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  completeAccountGetController
)

router.post(
  "/complete_account",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  completeAccountPostController
)

router.post(
  "/auth/resend_code",
  isVolunteerAuth,
  resendCodePostController
)

router.post(
  "/project/join",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  projectJoinPostController
);

router.post(
  "/project/exit",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  projectExitPostController
);

router.get(
  "/organization",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  organizationGetController
);

router.post(
  "/organization/like",
  isVolunteerAuth,
  isVolunteerEmailConfirmed,
  isAccountCompleted,
  organizationLikePostController
);

module.exports = router;
