const mongoose = require("mongoose");

const skillGapCacheSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputHash: {
      type: String,
      required: true,
    },
    analysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

skillGapCacheSchema.index(
  { userId: 1, inputHash: 1 },
  { unique: true }
);

skillGapCacheSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

module.exports = mongoose.model("SkillGapCache", skillGapCacheSchema);