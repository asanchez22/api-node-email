const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./src/routes/index");
const keys = require("./serviceAccountKey");
const admin = require("firebase-admin");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var app = express();

// View engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Firebase setup
const fb = admin.initializeApp({
  credential: admin.credential.cert(keys),
});

// Config express
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route
app.use("/", indexRouter);

module.exports = app;
