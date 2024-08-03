const express = require("express");
const {
  createBlogController,
  getBlogsController,
  getMyBlogsController,
  editBlogController,
  deleteBlogController,
} = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter
  .get("/get-blogs", getBlogsController)
  .get("/get-myBlogs", getMyBlogsController)
  .post("/create-blog", createBlogController)
  .post("/edit-blog", editBlogController)
  .post("/delete-blog", deleteBlogController);

module.exports = blogRouter;