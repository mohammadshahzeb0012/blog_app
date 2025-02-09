const {
  followUser,
  getFollowingList,
  unfollowUser,
  getFollowerList,
  suggestionsUsersList,
} = require("../models/followModel");
const User = require("../models/userModel");

const suggationsController = async (req, res) => {
  const followerUserId = req.session.user.userId
  const SKIP = Number(req.query.skip) || 0;
  try {
    const followingListDb = await getFollowingList({ followerUserId, SKIP });
    const excludesUsers = followingListDb.map(user => user._id)
    const suggestionsUsers = await suggestionsUsersList({ SKIP, excludesUsers, followerUserId })

    if (suggestionsUsers.length === 0) {
      return res.send({
        status: 203,
        message: "No suggestions found",
      });
    }

    return res.send({
      status: 200,
      message: "Read success",
      data: suggestionsUsers,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
}

const followUserController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;
  try {
    await User.findUserWithKey({ key: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid follower userId",
      error: error,
    });
  }

  try {
    await User.findUserWithKey({ key: followingUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid following userId",
      error: error,
    });
  }

  try {
    const followDb = await followUser({ followingUserId, followerUserId });

    return res.send({
      status: 201,
      message: "Follow successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

const getFollowingListController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const SKIP = Number(req.query.skip) || 0;

  try {
    await User.findUserWithKey({ key: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid follower userId",
      error: error,
    });
  }

  try {
    const followingListDb = await getFollowingList({ followerUserId, SKIP });

    if (followingListDb.length === 0) {
      return res.send({
        status: 203,
        message: "No following found",
      });
    }

    return res.send({
      status: 200,
      message: "Read success",
      data: followingListDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

const getFollowerListController = async (req, res) => {
  const SKIP = Number(req.query.skip) || 0;
  const followingUserId = req.session.user.userId;

  try {
    await User.findUserWithKey({ key: followingUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Invalid following userId",
      error: error,
    });
  }

  try {
    const followerListDb = await getFollowerList({ followingUserId, SKIP });

    if (followerListDb.length === 0) {
      return res.send({
        status: 203,
        message: "No followers found",
      });
    }

    return res.send({
      status: 200,
      message: "Read success",
      data: followerListDb,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

const unfollowUserController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;

  try {
    const deleteDb = await unfollowUser({ followerUserId, followingUserId });

    return res.send({
      status: 200,
      message: "Unfollow successfull",
      data: deleteDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  suggationsController,
  followUserController,
  getFollowingListController,
  unfollowUserController,
  getFollowerListController,
};

//test-->test3
//test-->test4
//test1-->test
//test2--->test

//test(4, 2)
