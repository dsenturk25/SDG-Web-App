
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

const registerGetController = require("../controllers/Admin/Auth/register/get");
const loginGetController = require("../controllers/Admin/Auth/login/get");
const indexGetController = require("../controllers/Admin/index/get");

const waitlistGetController = require("../controllers/Admin/index/waitlist/get")
const organizationGetController = require("../controllers/Admin/index/organization/get")
const projectGetController = require("../controllers/Admin/index/project/get")
const volunteerGetController = require("../controllers/Admin/index/volunteer/get")
const sdgGetController = require("../controllers/Admin/index/sdg/get")


router.get(
  "/",
  isAdminAuth,
  indexGetController
)

router.get(
  "/waitlist",
  isAdminAuth,
  waitlistGetController
)


router.get(
  "/volunteer",
  isAdminAuth,
  volunteerGetController
)


router.get(
  "/organization",
  isAdminAuth,
  organizationGetController
)


router.get(
  "/project",
  isAdminAuth,
  projectGetController
)


router.get(
  "/sdg",
  isAdminAuth,
  sdgGetController
)


router.post(
  "/authRegister",
  registerPostController
);

router.get(
  "/register",
  registerGetController
)

router.post(
  "/authLogin", 
  loginPostController
);

router.get(
  "/login",
  loginGetController
)

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
  "/organization/waitlist",
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
