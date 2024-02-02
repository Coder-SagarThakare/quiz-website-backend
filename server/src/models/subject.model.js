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

const subject = mongoose.model("subject", subjectSchema);

module.exports = subject;
