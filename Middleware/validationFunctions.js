const uservalidate = require("./userValidations");
const adminvalidate = require("./adminValidations");

const uservalidateRequest = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const adminvalidateRequest = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/* ************************************  user  ************************************ */

// Validation for user profile format
const validProfileFormat = uservalidateRequest(
  uservalidate.valid_profile_format
);

// Validation for editing user profile format
const validEditProfileFormat = uservalidateRequest(
  uservalidate.valid_editprofile_format
);

// Validation for login format
const validLogin = uservalidateRequest(uservalidate.valid_login_format);

// Validation for Posts
const validPostInteraction = uservalidateRequest(
  uservalidate.valid_post_interaction
);
const validPostFormat = uservalidateRequest(uservalidate.valid_post_format);
const validPostComment = uservalidateRequest(uservalidate.valid_post_comment);
const validCommentReply = uservalidateRequest(uservalidate.valid_comment_reply);

/* ************************************  admin  ************************************ */

// admin Validation for login format
const adminLogin = adminvalidateRequest(adminvalidate.Login);

module.exports = {
  //user
  validProfileFormat,
  validLogin,
  validEditProfileFormat,
  validPostFormat,
  validPostInteraction,
  validPostComment,
  validCommentReply,

  // admin
  adminLogin,
};
