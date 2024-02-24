//  Post Folower Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postFollower = new schema({
  followedBy: { type: schema.ObjectId, ref: "user", default: null },
  postId: { type: schema.ObjectId, ref: "post", default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("postFollower", postFollower);
