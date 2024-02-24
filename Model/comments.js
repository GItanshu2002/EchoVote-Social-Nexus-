//  comments Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const comments = new schema({
  postId: { type: schema.ObjectId, ref: "post", default: null },
  commentBy: { type: schema.ObjectId, ref: "user", default: null },
  discription: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("comments", comments);
