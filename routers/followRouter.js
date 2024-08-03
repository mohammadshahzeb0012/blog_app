const express = require("express");
const {
  followUserController,
  getFollowingListController,
  unfollowUserController,
  getFollowerListController,
  suggationsController,
} = require("../controllers/followController");
const followRouter = express.Router();

followRouter
  .get("/suggations", suggationsController)
  .post("/follow-user", followUserController)
  .get("/get-followingList", getFollowingListController)
  .get("/get-followerList", getFollowerListController)
  .post("/unfollow-user", unfollowUserController);

module.exports = followRouter;