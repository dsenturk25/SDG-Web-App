
const express = require("express");
const router = express.Router();

const registerPostController = require("../controllers/Organization/authOrganization/register/post");
const loginPostController = require("../controllers/Organization/authOrganization/login/post");
const profileGetController = require("../controllers/Organization/index/profile/get");

const isOrganizationAuth = require("../middleware/isOrganizationAuth");
const isOrganizationOnWaitlist = require("../middleware/isOrganizationOnWaitlist");

const registerGetController = require("../controllers/Organization/index/register/get");
const loginGetController = require("../controllers/Organization/index/login/get");
const indexGetController = require("../controllers/Organization/index/index/get");
const waitlistGetController = require("../controllers/Organization/index/waitlist/get");
const organizationVolunteersGetController = require("../controllers/Organization/index/volunteers/get");
const comparisonsPostController = require("../controllers/Organization/create/comparisons/post");
const graphGetController = require("../controllers/Organization/index/graph/get");
const volunteersRemovePostController = require("../controllers/Organization/remove/volunteer/post");
const profilePostController = require("../controllers/Organization/index/profile/post");

const isAccountCompleted = require("../middleware/isOrganizationCompleted");
const completeAccountPostController = require("../controllers/Organization/authOrganization/complete/post");
const completeAccountGetController = require("../controllers/Organization/authOrganization/complete/get");

const multer = require("multer");

const upload = multer({
  dest: "./uploads/",
  limits: {
    fileSize: 100000000
  },
})


router.get(
  "/",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  indexGetController
)

router.get(
  "/volunteers",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  organizationVolunteersGetController
)

router.post(
  "/volunteers/remove",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  volunteersRemovePostController
)

router.post(
  "/comparisons",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  comparisonsPostController
)

router.get(
  "/graph",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  graphGetController
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
  isAccountCompleted,
  profileGetController
);

router.post(
  "/edit-profile",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  isAccountCompleted,
  upload.single("photo"),
  profilePostController
);

router.get(
  "/waitlist",
  isOrganizationAuth,
  waitlistGetController
)


router.get(
  "/complete_account",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  completeAccountGetController
)

router.post(
  "/complete_account",
  isOrganizationAuth,
  isOrganizationOnWaitlist,
  upload.single("photo"),
  completeAccountPostController
)

module.exports = router;
