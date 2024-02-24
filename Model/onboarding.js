const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getOnboard = new Schema({
  title: { type: String, default: null },
  detail: { type: String, default: null },
  image: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("getOnboard", getOnboard);
