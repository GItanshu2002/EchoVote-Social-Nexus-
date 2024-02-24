//  comments reply Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentreply = new schema({
  postId: { type: schema.ObjectId, ref: "post", default: null },
  commentId: { type: schema.ObjectId, ref: "comments", default: null },
  replyBy: { type: schema.ObjectId, ref: "user", default: null },
  message: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("commentreply", commentreply);
