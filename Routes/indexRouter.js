
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const registerGetController = require("../controllers/index/register/get");
const loginGetController = require("../controllers/index/login/get");

router.get(
  "/",
  indexGetController
)

router.get(
  "/login",
  loginGetController
)

router.get(
  "/register",
  registerGetController
)

module.exports = router;
