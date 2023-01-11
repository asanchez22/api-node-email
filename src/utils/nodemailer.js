const nodemailer = require("nodemailer");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const email = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASS}`,
  },
});

email.verify().then(() => {
  console.log("Ready for send email");
});

module.exports = email;
