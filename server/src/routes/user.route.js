const { userController, subjectController } = require("../controllers");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { userValidation } = require("../validations");

const router = require("express").Router();

// Token authentication for all routes defined in this file
router.use(auth("student"));

// get update user
router
  .route("/self")
  .get(userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser);

router.get("/all-streams", userController.getAllStreams);

router.get("/stream/:streamId", subjectController.getSubjectsByStreamId); // add validation

module.exports = router;
