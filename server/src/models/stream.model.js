const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const streamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
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
    createdBy: {
      type: objectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Stream = mongoose.model("stream", streamSchema);

module.exports = Stream;
