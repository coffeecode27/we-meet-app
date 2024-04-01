const router = require("express").Router();
const User = require("../models/User"); // import User model
const bcrypt = require("bcrypt"); // import bcrypt for password hashing

// routes handling for auth

// REGISTER
router.post("/register", async (req, res) => {
  // create new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // hash password
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(newUser.password, salt); // hash password with salt
    newUser.password = hashedPassword; // set hashed password in newUser object
    const savedUser = await newUser.save(); // save newUser object
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // find user by email in database
    !user && res.status(400).send("User not found!");

    // compare password with hashed password in database
    const validPassword = await bcrypt.compare(
      req.body.password, // password from request body
      user.password // hashed password from database
    );
    !validPassword && res.status(400).json("Wrong password!"); // wrong password
    res.status(200).json(user); // correct password
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
