const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const testSchema = mongoose.Schema({
  user: {
    type: objectId,
    ref: "user",
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  questions: [questionSchema],
  topic: {
    type: objectId,
    ref: "topic",
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  correctAnsCount: {
    type: Number,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  questionId: {
    type: objectId,
    ref: "question",
    required: true,
  },
  userAns: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});
