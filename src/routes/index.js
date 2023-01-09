var express = require("express");
var router = express.Router();
const sendEmail = require("../controllers/email.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Vive Okey",
    subtitle: "verification e-mail",
  });
});

router.post("/verifyEmail", sendEmail);

module.exports = router;
