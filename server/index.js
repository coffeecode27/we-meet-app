const express = require("express"); // import express for server handling
const mongoose = require("mongoose"); // import mongoose for database interaction
const helmet = require("helmet"); // import helmet for security headers
const morgan = require("morgan"); // import morgan for logging
const dotenv = require("dotenv"); // import dotenv for environment variables
const cors = require("cors"); // import cors for cross-origin resource sharing
const multer = require("multer"); // import multer for file upload
const path = require("path"); // import path for file image path

// All Routes import
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
const port = 8000;

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Handle file images path
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // set security headers
app.use(morgan("common")); // log requests to console

// CORS middleware
app.use(cors());

// storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(req.body.name);
    cb(null, req.body.name);
  },
});

// File upload middleware
const upload = multer({ storage });
// upload.single means that only one file can be uploaded
//  upload.single also will upload the file automatically
app.use("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {}
});

// Routes middleware
app.use("/api/users", userRoute); // user route
app.use("/api/auth", authRoute); // auth route
app.use("/api/posts", postRoute); // post route

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
