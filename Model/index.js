const user = require("./user");
const admin = require("./admin");
const post = require("./post");
const getOnboard = require("./onboarding");
const privacyPolicy = require("./privacyPolicy.js");
const termsConditions = require("./terms&condtion.js");
const postFollower = require("./postFollowers");
const vote = require("./vote");
const result = require("./result");
const friends = require("./friends");
const comment = require("./comments");
const commentReply = require("./commentReply");
const postReply = require("./postReply");
const notification = require("./notification");

module.exports = {
  user: user,
  admin: admin,
  post: post,
  getOnboard: getOnboard,
  privacyPolicy: privacyPolicy,
  termsConditions: termsConditions,
  postFollower: postFollower,
  vote: vote,
  result: result,
  friends: friends,
  comment: comment,
  commentReply: commentReply,
  postReply: postReply,
  notification: notification,
};
