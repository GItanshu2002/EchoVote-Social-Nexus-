const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let post = new Schema({
  image: { type: String, default: null },
  userId: { type: Schema.ObjectId, ref: "user", default: null },
  discription: { type: String, default: null },
  duration: { type: Number, default: null },
  postType: {
    type: String,
    enum: ["Open", "Invite_User"],
    default: null,
  },
  invited_user_id: [{ type: Schema.ObjectId, ref: "user", default: null }],
  post_follower_count: { type: Number, default: 0 },
  participant_id: { type: Schema.ObjectId, ref: "user", default: null },
  participant_joined: { type: Boolean, default: false },
  participant_post_Image: { type: String, default: null },
  participant_post_discription: { type: String, default: null },
  participant_post_time: { type: Number, default: null },
  creator_post_vote_count: { type: Number, default: 0 },
  participant_post_vote_count: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  isExpired: { type: Boolean, default: false },
});

module.exports = mongoose.model("post", post);
