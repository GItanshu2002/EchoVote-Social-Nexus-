//  Post Reply Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postReply = new schema({
  postId: { type: schema.ObjectId, ref: "post", default: null },
  replyBy: { type: schema.ObjectId, ref: "user", default: null },
  image: { type: String, default: null },
  discription: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("postReply", postReply);
