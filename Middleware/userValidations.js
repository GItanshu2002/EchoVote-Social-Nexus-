const Joi = require("joi");

// profile Validation
const valid_profile_format = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  dob: Joi.date().required(),
  userName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .description("Enter your Email Address"),
  image: Joi.string().required(),
});

// edit profile Validation
const valid_editprofile_format = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional()
    .description("Enter your Email Address"),
  gender: Joi.string().optional(),
  dob: Joi.date().optional(),
  image: Joi.string().optional(),
  userName: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .description("Enter your phone Number"),
  countryCode: Joi.string()
    .pattern(/^\+\d{1,3}$/)
    .optional(),
  country: Joi.string().optional(),
  bio: Joi.string().optional(),
});

// User Login Vaidation
const valid_login_format = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .description("Enter your phone Number"),
  countryCode: Joi.string()
    .pattern(/^\+\d{1,3}$/)
    .required(),
});

// POST Vaidation
const valid_post_format = Joi.object({
  image: Joi.string().required(),
  discription: Joi.string().required(),
  duration: Joi.number().required(),
  postType: Joi.string().required(),
  invited_user_id: Joi.array().optional(),
});

// POST reply Vaidation
const valid_post_interaction = Joi.object({
  image: Joi.string().required(),
  discription: Joi.string().required(),
  _id: Joi.string().required().description("Enter the post Id"),
});

// POST comment Vaidation
const valid_post_comment = Joi.object({
  _id: Joi.string().optional().description("Enter the comment Id"), // if want to edit
  discription: Joi.string().required(),
  postId: Joi.string().required().description("Enter the post Id"),
});

// comment reply Vaidation
const valid_comment_reply = Joi.object({
  _id: Joi.string().optional().description("Enter the comment Id"), // if want to edit
  message: Joi.string().required(),
  postId: Joi.string().required().description("Enter the post Id"),
  commentId: Joi.string().required().description("Enter the comment Id"),
});

//

module.exports = {
  valid_profile_format,
  valid_login_format,
  valid_editprofile_format,
  valid_post_format,
  valid_post_interaction,
  valid_post_comment,
  valid_comment_reply,
};
