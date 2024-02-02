const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topics: [
    {
      type: String,
      required: true,
    },
  ],
});

subjectSchema.statics.isSubjectTaken = async function (subject) {
  const resp = await this.findOne({ name: subject });
  console.log('resp',resp, subject);
  return !!resp;
};

const subject = mongoose.model("subject", subjectSchema);

module.exports = subject;
