const mongoose = require("mongoose");
const { private } = require("./plugins");

const questionSchema = mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{ type: String, required: true }],
    level: {
        type: String,
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    }
}, { timestamp: true })

questionSchema.plugin(private);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;