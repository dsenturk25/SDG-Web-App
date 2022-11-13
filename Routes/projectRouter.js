
const express = require("express");
const router = express.Router();

const isOrganizationAuth = require("../middleware/isOrganizationAuth");

const createPostController = require("../controllers/Project/create/post");
const editPostController = require("../controllers/Project/edit/post");
const deletePostController = require("../controllers/Project/delete/post");

const findIdGetController = require("../controllers/Project/getById/get");
const findAllGetController = require("../controllers/Project/getAll/get");

router.post(
  "/create",
  isOrganizationAuth,
  createPostController
);

router.post(
  "/edit",
  isOrganizationAuth,
  editPostController
);

router.post(
  "/delete",
  isOrganizationAuth,
  deletePostController
);

router.get(
  "/get/id",
  isOrganizationAuth,
  findIdGetController
);

router.get(
  "/get/all",
  isOrganizationAuth,
  findAllGetController
);

module.exports = router;

