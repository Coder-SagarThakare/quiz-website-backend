const mongoose = require("mongoose");
const { private } = require("./plugins");

const objectId = mongoose.Schema.Types.ObjectId;

const questionSchema = mongoose.Schema(
  {
    topic: {
      type: objectId,
      ref: "topic",
      required: true,
      index: true
    },
    question: {
      type: String,
      required: true,
    },
    publicId : {
      type : String,
      required : true
    },
    bgImage: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/difupvzin/image/upload/v1707290825/bgimage-stream.png",
    },
    type: {
      type: String,
      required: true,
      enum: ["singleSelect", "multiSelect", "trueFalse", "userInput"]
    },
    options: {
      type: [{ type: String, required: true }],
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: props => `${props.path} must contain exact 4 options `
      },
    },
    level: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
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
