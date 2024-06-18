const logger = require("../config/logger");
const { authController, teacherController } = require("../controllers");
const auth = require("../middlewares/auth");
const captcha = require("../middlewares/captcha");
const validate = require("../middlewares/validate");
const { authValidation, teacherValidation } = require("../validations");
const { upload } = require("../middlewares/multer");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hiii in auth /");
});

router.post(
  "/student/register",
  [captcha.verify, validate(authValidation.registerStudent)],
  authController.registerStudent
);

router.post(
  "/student/login",
  [captcha.verify, validate(authValidation.studentLogin)],
  authController.studentLogin
);

router.post(  
  "/teacher/register",
  upload.single("collegeIdProof") ,
  validate(authValidation.registerTeacher),
  authController.registerTeacher
);

router.post("/teacher/login",validate(authValidation.teacherLogin),authController.loginTeacher)
// router.post("/teacher/login",validate(authValidation.teacherLogin),()=>{console.log("sss");})

router.post(
  "/login/:provider",
  [captcha.verify, validate(authValidation.socialLogin)],
  authController.socialLogin
);

router.post(
  "/forgot-password",
  [captcha.verify, validate(authValidation.forgotPassword)],
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  "/send-verification-email",
  [auth()],
  authController.sendVerificationEmail
);

router.post(
  "/verify-email",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

router.get(
  "/send-verification-otp",
  auth(),
  authController.sendVerificationOTP
);

router.post(
  "/verify-otp",
  [validate(authValidation.verifyOTP), auth()],
  authController.verifyOTP
);

module.exports = router;
