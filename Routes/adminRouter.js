
const express = require("express");
const router = express.Router();

const isAdminAuth = require("../middleware/isAdminAuth");

const registerPostController = require("../controllers/Admin/Auth/register/post");
const loginPostController = require("../controllers/Admin/Auth/login/post");

const volunteerFetchGetController = require("../controllers/Admin/fetch/volunteer/get");
const sdgFetchGetController = require("../controllers/Admin/fetch/sdg/get");
const organizationFetchGetController = require("../controllers/Admin/fetch/organization/get");
const projectFetchGetController = require("../controllers/Admin/fetch/project/get");
const volunteerFetchFilterGetController = require("../controllers/Admin/fetch/filter/volunteer/get");
const comparisonsFetchPostController = require("../controllers/Admin/fetch/comparisons/post");
const createLearnPostController = require("../controllers/Admin/index/learn/create/post");

const volunteerDeletePostController = require("../controllers/Admin/delete/volunteer/post");
const sdgDeletePostController = require("../controllers/Admin/delete/sdg/post");
const organizationDeletePostController = require("../controllers/Admin/delete/organization/post");
const projectDeletePostController = require("../controllers/Admin/delete/project/post");

const sdgCreatePostController = require("../controllers/Admin/create/sdg/post");

const organizationWaitlistPostController = require("../controllers/Admin/waitlist/organization/post");

const registerGetController = require("../controllers/Admin/Auth/register/get");
const loginGetController = require("../controllers/Admin/Auth/login/get");
const indexGetController = require("../controllers/Admin/index/get");

const waitlistGetController = require("../controllers/Admin/index/waitlist/get");
const organizationGetController = require("../controllers/Admin/index/organization/get");
const projectGetController = require("../controllers/Admin/index/project/get");
const volunteerGetController = require("../controllers/Admin/index/volunteer/get");
const sdgGetController = require("../controllers/Admin/index/sdg/get");
const comparisonsGetController = require("../controllers/Admin/index/comparisons/get");
const learnGetController = require("../controllers/Admin/index/learn/get");
const todaysPicksGetController = require("../controllers/Admin/index/todaysPicks/get");
const todaysPicksPostController = require("../controllers/Admin/index/todaysPicks/post");
const activistsGetController = require("../controllers/Admin/index/activists/get");
const createActivistPostController = require("../controllers/Admin/index/activists/create/post");
const activistOfWeekPostController = require("../controllers/Admin/index/activists/edit/post");
const skillsGetController = require("../controllers/Admin/index/skills/get");
const createSkillsPostController = require("../controllers/Admin/index/skills/create/post")

const multer = require("multer");


const upload = multer({
  dest: "./uploads/",
  limits: {
    fileSize: 100000000
  },
})

router.use(express.json());

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

router.get(
  "/comparisons",
  isAdminAuth,
  comparisonsGetController
)

router.post(
  "/comparisons/fetch",
  isAdminAuth,
  comparisonsFetchPostController
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
  "/volunteer/filter/fetch",
  isAdminAuth,
  volunteerFetchFilterGetController
)

router.post(
  "/volunteer/delete",
  isAdminAuth,
  volunteerDeletePostController
)

router.post(
  "/sdg/create",
  isAdminAuth,
  upload.single("image"),
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

router.get(
  "/learn",
  isAdminAuth,
  learnGetController
)

router.post(
  "/learn/create",
  isAdminAuth,
  createLearnPostController
)

router.get(
  "/todays-picks",
  isAdminAuth,
  todaysPicksGetController
)

router.post(
  "/todays-picks/change-state",
  isAdminAuth,
  todaysPicksPostController
)

router.get(
  "/activists",
  isAdminAuth,
  activistsGetController
)

router.post(
  "/activists/create",
  isAdminAuth,
  upload.single("image"),
  createActivistPostController
)

router.post(
  "/activists/edit",
  isAdminAuth,
  activistOfWeekPostController
)

router.get(
  "/skills",
  isAdminAuth,
  skillsGetController
)

router.post(
  "/skills/create",
  isAdminAuth,
  createSkillsPostController
)

module.exports = router;
