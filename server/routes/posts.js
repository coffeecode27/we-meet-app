const router = require("express").Router();
const Post = require("../models/Post"); // import Post model
const User = require("../models/User"); // import User model

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body); // create new(instance) object post
  try {
    const savedPost = await newPost.save(); // save new post to database
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE A POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // find post by id in database
    // check if userId in post document match with userId in body request
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body }); // update post
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // find post by id in database
    // check if userId in post document match with userId in body request
    if (post.userId === req.body.userId) {
      await post.deleteOne(); // delete post
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE AND DISLIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // find post by id in database
    // check if likes array in post document is not include userId from body request
    if (!post.likes.includes(req.body.userId)) {
      // if true, push userId to likes array
      await post.updateOne({ $push: { likes: req.body.userId } }); // like post
      res.status(200).json("The post has been liked");
      // if false, pull userId from likes array
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } }); // dislike post
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // find post by id in database
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS FROM (CURRENT) USER FOR PROFILE PAGE
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }); // find user by username that request from url with username from User Document
    const posts = await Post.find({ userId: user._id }); // find post from id user (in user document) that match with userId (in from Post Document)
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL TIMELINE POST(from following users)
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId); // find Current user in User Document by userId
    const userPosts = await Post.find({ userId: currentUser._id }); // find post from current user that match with userId(from User Document)
    const friendPosts = await Promise.all(
      // find all posts from current user's following
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
