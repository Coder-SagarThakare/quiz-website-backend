const {
  userController,
  subjectController,
  topicController,
  questionController,
} = require("../controllers");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {
  userValidation,
  streamValidation,
  topicValidation,
  questionValidation,
} = require("../validations");

const router = require("express").Router();

// Token authentication for all routes defined in this file
router.use(auth("student"));

// get,update user
router
  .route("/self")
  .get(userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser);

router.get("/all-streams", userController.getAllStreams);

router.get(
  "/stream/:streamId",
  validate(streamValidation.getSubjectsByStreamId),
  subjectController.getSubjectsByStreamId
); // add validation

router.get(
  "/stream/subject/:subject_id/topics",
  validate(topicValidation.getTopicsBySubjectId),
  topicController.getTopicsBySubjectId
);

router.get(
  "/stream/subject/topics/:topicId",
  validate(questionValidation.getQuestionsByTopicId),
  questionController.getQuestionsByTopicId
);

module.exports = router;
