const nodemailer = require("nodemailer");

const email = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "viveokeybackoffice@gmail.com",
    pass: "nouptauctnkvxzrs",
  },
});

email.verify().then(() => {
  console.log("Ready for send email");
});

module.exports = email;
