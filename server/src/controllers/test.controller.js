const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const checkAnswers = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send("answers checked from backend");
})

module.exports = { checkAnswers }