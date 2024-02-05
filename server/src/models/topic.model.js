const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const topicSchema = mongoose.Schema(
  {
    subject: {
      type: objectId,
      ref: "subject",
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Topic = mongoose.model("topic", topicSchema);

module.exports = Topic;
