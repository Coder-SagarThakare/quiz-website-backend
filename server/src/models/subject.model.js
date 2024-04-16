const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { private } = require("./plugins");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
    },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"stream"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "user"
    },
  },
  { timestamps: true }
);

subjectSchema.statics.isSubjectTaken = async function (subject) {
  const resp = await this.findOne({ name: subject });

  return !!resp;
};

subjectSchema.statics.isTopicTaken = async function (subjectId, topic) {
  const data = await this.findOne({ _id: subjectId });

  // does we really need to throw this
  if (!data)
    throw new ApiError(httpStatus.NOT_FOUND, "Please enter valid mongo id");

  const isAlreadyAdded = data.topics.includes(topic);

  return isAlreadyAdded;
};

subjectSchema.plugin(private);

const subject = mongoose.model("subject", subjectSchema);

module.exports = subject;
