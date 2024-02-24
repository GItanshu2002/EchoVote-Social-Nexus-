//  vote Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vote = new schema({
  postId: { type: schema.ObjectId, ref: "post", default: null },
  voterId: { type: schema.ObjectId, ref: "user", default: null },
  voteTo: { type: schema.ObjectId, ref: "user", default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("vote", vote);
