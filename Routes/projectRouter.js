
const express = require("express");
const router = express.Router();
const multer = require("multer");

const isOrganizationAuth = require("../middleware/isOrganizationAuth");

const createPostController = require("../controllers/Project/create/post");
const editPostController = require("../controllers/Project/edit/post");
const deletePostController = require("../controllers/Project/delete/post");

const findIdGetController = require("../controllers/Project/getById/get");
const findAllGetController = require("../controllers/Project/getAll/get");


const upload = multer({
  dest: "./uploads/",
  limits: {
      fileSize: 100000000
  },
})

router.post(
  "/create",
  isOrganizationAuth,
  upload.single("photo"),
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

