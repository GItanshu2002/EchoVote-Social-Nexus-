//  Privacy Policy Schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const privacyPolicySchema = new schema({
  privacyPolicy: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model("privacyPolicySchema", privacyPolicySchema);
