const mongoose = require("mongoose");
const { private } = require("./plugins");

const objectId = mongoose.Schema.Types.ObjectId;

const questionSchema = mongoose.Schema(
  {
    topic: {
      type: objectId,
      ref : "topic",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [{ type: String, required: true }],
    level: {
      type: String,
      required: true,
    },
    correctOption: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

questionSchema.plugin(private);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
