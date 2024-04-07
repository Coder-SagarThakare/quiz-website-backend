const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { questionService } = require("../services");

const addQuestion = catchAsync(async(req, res) => {
    await questionService.addQuestion(req.body)

    res.status(httpStatus.OK).send("from questio controller")
})

module.exports = {
    addQuestion
}
