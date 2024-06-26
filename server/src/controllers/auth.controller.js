const catchAsync = require("../utils/catchAsync");
const {
  tokenService,
  authService,
  emailService,
  otpService,
  userService,
  teacherService,
} = require("../services");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

// student registration
const registerStudent = catchAsync(async (req, res) => {
  let user = await authService.registerUser({ ...req.body });

  const token = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.CREATED).json(token);
});

// student login
const studentLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const { token } = await tokenService.generateAuthTokens(user);

  res.send({ token, user });
});

// register teacher
const registerTeacher = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, "Please upload an image.");
  }

  await teacherService.registerTeacher({ ...req.body }, req.file.path);
  res
    .status(httpStatus.CREATED)
    .send({ message: "Teacher registered sucessfully" });
});
// teacher login
const loginTeacher = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await authService.loginTeacherWithEmailAndPassword(
    email,
    password
  );
  const {token} = await tokenService.generateAuthTokens(teacher);

  res.status(httpStatus.OK).send({ token, user: teacher });
});

const socialLogin = catchAsync(async (req, res) => {
  const idToken = req.body.token;
  let user;
  const provider = req.params.provider.toLowerCase();
  switch (provider) {
    case "google":
      user = await authService.loginWithGoogle(idToken);
      break;
    // case "facebook":
    // user = await authService.loginWithFacebook(idToken);
    // break;
    default:
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        `Provider ${req.body.provider} is not supported`
      );
  }
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPassword(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(200).json({ message: "Email sent successfully" });
});

const resetPassword = catchAsync(async (req, res) => {
  const a = await authService.resetPassword(req.query.token, req.body.password);
  res.status(200).json({ message: "Password reset successfully" });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.OK).json({ message: "verify email sent successfully" });
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.OK).json({ message: "e-mail verified successfully" });
});

const sendVerificationOTP = catchAsync(async (req, res) => {
  const otp = await otpService.sendVerificationOTP(req.user.email);

  await userService.updateUserById(req.user.id, {
    otp: otp,
    otpGeneratedTime: new Date(),
  });

  res
    .status(httpStatus.OK)
    .send({ message: "Check otp on your registered mail-id" });
});

const verifyOTP = catchAsync(async (req, res) => {
  await otpService.validateOTP(req.user.id, req.body.otp);

  res
    .status(httpStatus.OK)
    .send({ success: true, message: "Email verified successfully !!!" });
});

module.exports = {
  registerStudent,
  studentLogin,
  registerTeacher,
  loginTeacher,
  socialLogin,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendVerificationOTP,
  verifyOTP,
};
