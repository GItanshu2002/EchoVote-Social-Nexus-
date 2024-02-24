//  vote Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const result = new schema({
  postId: { type: schema.ObjectId, ref: "post", default: null },
  is_tie: { type: Boolean, default: false },
  winnerId: { type: schema.ObjectId, ref: "user", default: null },
  losserId: { type: schema.ObjectId, ref: "user", default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("result", result);
