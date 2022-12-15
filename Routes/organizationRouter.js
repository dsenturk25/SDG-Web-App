
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Organization/authOrganization/register/post");
const loginPostController = require("../controllers/Organization/authOrganization/login/post");
const profileGetController = require("../controllers/Organization/authOrganization/profile/get");

const isOrganizationAuth = require("../middleware/isOrganizationAuth");
const isOrganizationOnWaitlist = require("../middleware/isOrganizationOnWaitlist");

const registerGetController = require("../controllers/Organization/index/register/get");
const loginGetController = require("../controllers/Organization/index/login/get");
const indexGetController = require("../controllers/Organization/index/index/get");
const waitlistGetController = require("../controllers/Organization/index/waitlist/get");

router.get(
  "/",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  indexGetController
)

router.post(
  "/register",
  registerPostController
);

router.get(
  "/register",
  registerGetController
)

router.post(
  "/login",
  loginPostController
);

router.get(
  "/login",
  loginGetController
);

router.get(
  "/profile",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  profileGetController
);

router.get(
  "/waitlist",
  isOrganizationAuth,
  waitlistGetController
)

module.exports = router;
