//  Privacy Policy Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const friends = new schema({
  request_by_id: { type: schema.ObjectId, ref: "user", default: null },
  request_to_id: { type: schema.ObjectId, ref: "user", default: null },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("friends", friends);
