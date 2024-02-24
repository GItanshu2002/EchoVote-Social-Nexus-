const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
  countryCode: { type: String, default: null },
  country: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  otp: { type: Number, default: 0 },
  otp_verified: { type: Boolean, default: false },
  name: { type: String, default: null },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer Not To Say"],
    default: null,
  },
  dob: { type: Number, default: 0 },
  userName: { type: String, default: null },
  email: { type: String, default: null },
  image: { type: String, default: null },
  bio: { type: String, default: null },
  post_following_count: { type: Number, default: 0 },
  friendsCount: { type: Number, default: 0 },
  totalvote_count: { type: Number, default: 0 },
  deviceToken: { type: String, default: null },
  deviceType: { type: String, enum: ["android", "ios"], default: "android" },
  profileSetup: { type: Boolean, default: false },
  accessToken: { type: String, default: null },
  tokenGenerateAt: { type: Number, default: +new Date() },
  isBlocked: { type: Boolean, default: false },
  lastLoginTime: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  socialKey: { type: String, default: null },
  socialLogin: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", user);
