const router = require("express").Router();
const User = require("../models/User"); // import User model
const bcrypt = require("bcrypt"); // import bcrypt for password hashing

// routes handling for users

// UPDATE USER
router.put("/:id", async (req, res) => {
  // check if userId in body match with userId params or admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // check if the update case is password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10); // generate salt
        req.body.password = await bcrypt.hash(req.body.password, salt); // hash new updated password with salt
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      // update user in database base on id in params
      const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  // check if userId in body match with userId params or admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // delete user in database base on id in params
      const DeleteUser = await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// GET A USER
router.get("/", async (req, res) => {
  const userId = req.query.userId; // get userId from query
  const username = req.query.username; // get username from query
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username }); // find user by id or username in database
    const { password, updatedAt, ...other } = user._doc; // remove password and updatedAt from user object and take the rest of the object
    res.status(200).json(other); // return 'other' as response
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWING FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); // find id of current user in database
    // find all following friends of current user
    const friends = await Promise.all(
      // we do promise all because each iteration of friend is a promise
      user.followings.map((friendId) => {
        return User.findById(friendId); // this is a promise iteration process
      })
    );
    let friendList = []; // make an empty array to store friend list
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(err);
  }
});

// FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  // check if userId in body is not equal to userId params
  if (req.body.userId !== req.params.id) {
    try {
      const userToBeFollowed = await User.findById(req.params.id); // find user (to be followed) by id in database
      const userWantToFollow = await User.findById(req.body.userId); // find user (who wants to follow) by id in database
      // check if user (to be followed) is not already followed by user (who wants to follow) by checking in followers array
      // if there is no user in followers array
      if (!userToBeFollowed.followers.includes(req.body.userId)) {
        // add user (who wants to follow) to followers array
        await userToBeFollowed.updateOne({
          $push: { followers: req.body.userId },
        });
        // and add user (to be followed) to followings array
        await userWantToFollow.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json(`${userToBeFollowed.username} has been followed!`);
      } else {
        res.status(403).json("you already follow this user!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself!");
  }
});

// UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
  // check if userId in body is not equal to userId params
  if (req.body.userId !== req.params.id) {
    try {
      const userToBeUnFollowed = await User.findById(req.params.id); // find user (to be unfollowed) by id in database
      const userWantToUnFollow = await User.findById(req.body.userId); // find user (who wants to unfollow) by id in database
      // check if user (to be unfollowed) already followed by user (who wants to unfollow) by checking in followers array
      // if there is user in followers array
      if (userToBeUnFollowed.followers.includes(req.body.userId)) {
        // remove user (who wants to unfollow) from followers array
        await userToBeUnFollowed.updateOne({
          $pull: { followers: req.body.userId },
        });
        // and remove user (to be unfollowed) from followings array
        await userWantToUnFollow.updateOne({
          $pull: { followings: req.params.id },
        });
        res
          .status(200)
          .json(`${userToBeUnFollowed.username} has been unfollowed!`);
      } else {
        res.status(403).json("you don't follow this user!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself!");
  }
});

// SEARCH USER
router.get("/search", async (req, res) => {
  const query = req.query.query;
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
