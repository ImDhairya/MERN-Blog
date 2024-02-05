const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({dest: "uploads/"});
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";
require("dotenv").config();
app.use(cors({credentials: true, origin: "http://localhost:5173"}));

app.use(express.json());
app.use(cookieParser());
// app.use("/uploads", express.static(__dirname + "/uploads"));

const url = process.env.URL;
mongoose.connect(url);

// mongoose.connect(
//   "mongodb+srv://dhairya:74p5WpUWUftjWNSu@cluster0.tbq8so1.mongodb.net/?retryWrites=true&w=majority"
// );

app.post("/register", async (req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    // console.log(e);
    // res.status(400).json(e);
    if (e.code === 11000) {
      res.status(400).json({message: "User already exists"});
    } else {
      console.log(e);
      res.status(500).json({
        message: "An error occured",
      });
    }
  }
});

app.post("/login", async (req, res) => {
  const {username, password} = req.body;

  try {
  } catch (error) {}

  const userDoc = await User.findOne({username});
  if (!userDoc) {
    res.status(400).json("USER NOT FOUND");
    return;
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  //  res.json(passOk);
  if (passOk) {
    // logged in
    jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", async (req, res) => {
  const {token} = req.cookies;
  if (!token) {
    res.status(401).json("Authentication required");
    return;
  }
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    res.status(500).json("Server error");
    return;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json();
});

// app.post("/post", uploadMiddleware.single("file"), (req, res) => {
//   console.log(req.file);
//   const {originalname} = req.file;
//   const parts = originalname.split(".");
//   const ext = parts[parts.length - 1];
//   res.json({ext});
// });

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({message: "No file received"});
    console.log(req);

    return;
  }

  try {
    const {originalname, path} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    // fs.renameSync(path, paht + "." + ext);
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    // res.json({ext});
    // res.json({files: req.file});

    const {title, summary, content} = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });

    res.json({postDoc});
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occured while processing the file"});
  }
});

app.listen(4000, () => {
  console.log("connected to 4000");
});
//
