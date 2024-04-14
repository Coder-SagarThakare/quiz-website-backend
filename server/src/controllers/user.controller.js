const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, streamService } = require("../services");

const getUser = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send(req.user); 
});

const updateUser = catchAsync(async (req, res) => {
  await userService.updateUserById(req.user._id, req.body);

  res 
    .status(200)
    .send({ success: true, message: "user modified successfully" });
});

const getAllStreams = catchAsync(async(req,res)=>{
  const streams = await streamService.getAllStreams()
  res.status(httpStatus.OK).send(streams)
})

module.exports = { getUser, updateUser ,getAllStreams};
