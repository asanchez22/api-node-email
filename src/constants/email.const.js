const EMAIL = {
  VALIDATE: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

const ERROR = {
  USER_NOT_FOND: "auth/user-not-found",
  INVALID_CONTINUE_URI: "auth/invalid-continue-uri",
  DEFAULT: "invalid",
};

const ERROR_MSG = {
  INVALID_EMAIL: "correo invalido",
  INVALID_REDIRECT: "re-dirección invalida",
};

module.exports = { ERROR, ERROR_MSG, EMAIL };
