const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/create", blogController.blog_create_get);

router
  .route("/")
  .get(blogController.blog_index)
  .post(blogController.blog_create_post);
router
  .route("/:id")
  .get(blogController.blog_details)
  .delete(blogController.blog_delete);

module.exports = router;
