const catchAsync = require("../utils/catchAsync");

const addNewSubject = catchAsync(async (req, res) => {
    res.send('teacher controller')
});

module.exports = { addNewSubject };
