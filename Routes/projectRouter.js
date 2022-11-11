
const express = require("express");
const router = express.Router();

const isOrganizationAuth = require("../middleware/isOrganizationAuth");

const createPostController = require("../controllers/Project/create/post");
const editPostController = require("../controllers/Project/edit/post");
const deletePostController = require("../controllers/Project/delete/post");

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

module.exports = router;

