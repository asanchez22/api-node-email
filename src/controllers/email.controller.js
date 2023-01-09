const { ERROR, ERROR_MSG, EMAIL } = require("../constants/email.const");
const { getAuth } = require("firebase-admin/auth");
const email = require("../utils/nodemailer");
const ejs = require("ejs");

const sentEmail = async (req, res, next) => {
  const { userEmail, redirectUrl } = req.body;

  //Validation Email and url redirect
  if (!userEmail?.match(EMAIL.VALIDATE)) {
    requestHTTP(res, 401, ERROR_MSG.INVALID_EMAIL);
  } else if (!redirectUrl || typeof redirectUrl !== "string") {
    requestHTTP(res, 401, ERROR_MSG.INVALID_REDIRECT);
  }

  //Config to create a validation link
  const actionCodeSettings = {
    url: redirectUrl,
  };

  try {
    processEmailValidation(res, userEmail, actionCodeSettings);
  } catch (error) {
    handleError(res, error.code, error.message);
  }
};

/**
 *
 * Renderer with view structure to email send
 */
const processEmailValidation = async (res, userEmail, actionCodeSettings) => {
  const actionLink = await getAuth().generateEmailVerificationLink(
    userEmail,
    actionCodeSettings
  );

  const template = await ejs.renderFile("src/views/verify-email.ejs", {
    link: actionLink,
  });

  await email.sendMail({
    from: '"Vive Okey" <viveokeybackoffice@gmail.com>',
    to: `${userEmail}`,
    subject: "Verifica el correo electrónico para Vive OK Backoffice",
    html: template, // html body
  });
  requestHTTP(res, 200, "Email successfully sent");
};

/**
 *
 *  Handle of specific or general errors
 */
const handleError = (res, error, message) => {
  switch (error) {
    case ERROR.USER_NOT_FOND:
      return res.status(404).json({ message });
    case ERROR.INVALID_CONTINUE_URI:
      return res.status(401).json({ message });
    default:
      return res.status(500).json({ message });
  }
};

/**
 *
 *  Method to send a respond HTTP
 */
const requestHTTP = (res, status, message = "") => {
  return res.status(status).json({ message });
};

module.exports = sentEmail;
