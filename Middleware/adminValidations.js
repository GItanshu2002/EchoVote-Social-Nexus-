const Joi = require("joi");

// Admin Login
const Login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required().description("Enter your Email"),
});

module.exports = {
  Login,
};
