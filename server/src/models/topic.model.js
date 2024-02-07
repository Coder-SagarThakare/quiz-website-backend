const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const { private } = require("./plugins");

const topicSchema = mongoose.Schema(
  {
    subject: {
      type: objectId,
      ref: "subject",
    },
    name: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.plugin(private);

const Topic = mongoose.model("topic", topicSchema);

module.exports = Topic;
