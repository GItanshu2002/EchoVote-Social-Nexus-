// Notifications Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notification = new schema({
  sender_id: { type: schema.ObjectId, ref: "user", default: null },
  reciver_id: { type: schema.ObjectId, ref: "user", default: null },
  message: { type: String, default: null },
  notification_type: {
    type: String,
    enum: [
      "FriendRequest",
      "Comment",
      "Post",
      "Result",
      "Vote",
      "PostInvitation",
      "Follow",
      "Onbording",
    ],
    default: null,
  },
  title: { type: String, default: null },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("notification", notification);

//sender id, reciver id, msg, title, isDeleted, isRead, createdAt
