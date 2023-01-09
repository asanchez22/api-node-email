const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./src/routes/index");
const keys = require("./serviceAccountKey");
const admin = require("firebase-admin");

// Firebase setup
const fb = admin.initializeApp({
  credential: admin.credential.cert(keys),
});

var app = express();

// View engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

const patf = path.join(__dirname, "src", "views");
console.log({ patf });

// Config express
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route
app.use("/", indexRouter);

module.exports = app;