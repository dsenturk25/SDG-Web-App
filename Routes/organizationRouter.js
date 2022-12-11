
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Organization/authOrganization/register/post");
const loginPostController = require("../controllers/Organization/authOrganization/login/post");
const profileGetController = require("../controllers/Organization/authOrganization/profile/get");

const isOrganizationAuth = require("../middleware/isOrganizationAuth");

const registerGetController = require("../controllers/Organization/index/register/get");
const loginGetController = require("../controllers/Organization/index/login/get");
const indexGetController = require("../controllers/Organization/index/index/get");

router.get(
  "/",
  isOrganizationAuth,
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
  profileGetController
);

module.exports = router;
