
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Organization/authOrganization/register/post");
const loginPostController = require("../controllers/Organization/authOrganization/login/post");
const profileGetController = require("../controllers/Organization/authOrganization/profile/get");

const isOrganizationAuth = require("../middleware/isOrganizationAuth");

router.post(
  "/register",
  registerPostController
);

router.post(
  "/login",
  loginPostController
);

router.get(
  "/profile",
  isOrganizationAuth,
  profileGetController
);

module.exports = router;
