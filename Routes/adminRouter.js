
const express = require("express");
const router = express.Router();

const isAdminAuth = require("../middleware/isAdminAuth");

const registerPostController = require("../controllers/Admin/Auth/register/post");
const loginPostController = require("../controllers/Admin/Auth/login/post");

const volunteerFetchGetController = require("../controllers/Admin/fetch/volunteer/get");
const sdgFetchGetController = require("../controllers/Admin/fetch/sdg/get");
const organizationFetchGetController = require("../controllers/Admin/fetch/organization/get");
const projectFetchGetController = require("../controllers/Admin/fetch/project/get");

const volunteerDeletePostController = require("../controllers/Admin/delete/volunteer/post");
const sdgDeletePostController = require("../controllers/Admin/delete/sdg/post");
const organizationDeletePostController = require("../controllers/Admin/delete/organization/post");
const projectDeletePostController = require("../controllers/Admin/delete/project/post");

const sdgCreatePostController = require("../controllers/Admin/create/sdg/post");

const organizationWaitlistPostController = require("../controllers/Admin/waitlist/organization/post");

router.post(
  "/register",
  registerPostController
);

router.post(
  "/login", 
  loginPostController
);

router.get(
  "/volunteer/fetch",
  isAdminAuth,
  volunteerFetchGetController
)

router.post(
  "/volunteer/delete",
  isAdminAuth,
  volunteerDeletePostController
)

router.post(
  "/sdg/create",
  isAdminAuth,
  sdgCreatePostController
)

router.get(
  "/sdg/fetch",
  isAdminAuth,
  sdgFetchGetController
)

router.post(
  "/sdg/delete",
  isAdminAuth,
  sdgDeletePostController
)

router.get(
  "/project/fetch",
  isAdminAuth,
  projectFetchGetController
)

router.post(
  "/project/delete",
  isAdminAuth,
  projectDeletePostController
)

router.post(
  "/organization/wait_list",
  isAdminAuth,
  organizationWaitlistPostController
)

router.get(
  "/organization/fetch",
  isAdminAuth,
  organizationFetchGetController
)

router.post(
  "/organization/delete",
  isAdminAuth,
  organizationDeletePostController
)

module.exports = router;
