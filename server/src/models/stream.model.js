const mongoose = require("mongoose");

const streamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
    },
    bgImage: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/difupvzin/image/upload/v1707290825/bgimage-stream.png",
    },
  },
  {
    timestamps: true,
  }
);

const Stream = mongoose.model("stream", streamSchema);

module.exports = Stream;
