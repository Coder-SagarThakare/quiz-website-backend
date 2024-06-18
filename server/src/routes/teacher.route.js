const {
  subjectController,
  topicController,
  streamController,
  questionController,
  teacherController,
} = require("../controllers");
const validate = require("../middlewares/validate");
const {
  subjectValidation,
  topicValidation,
  streamValidation,
  teacherValidation,
  questionValidation,
} = require("../validations");
const auth = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");

const router = require("express").Router();

// authenticate user has rights of teacher or not ?
router.use(auth("teacher"));

// get,update teacher data => pending
router.route("/self").get(teacherController.getTeacher)

// get all subjects
router.get("/all-subjects", subjectController.getAllSubjects);

// add new subject
router
  .route("/:streamId/add-subject")
  .post(upload.single("subjectBgImage"),
    validate(subjectValidation.addNewSubject),
    subjectController.addNewSubject
  );

// get ,delete subject
router
  .route("/subject/:subject_id")
  .get(
    validate(subjectValidation.getSubjectById),
    subjectController.getSubjectById
  )
  .patch(
    upload.single("subjectBgImage"),
    validate(subjectValidation.updateSubjectById),
    subjectController.updateSubjectById
  )
  .delete(
    validate(subjectValidation.deleteSubjectById),
    subjectController.deleteSubjectById
  );

// add topics to perticular subject
router
  .route("/subject/:subject_id/add-topic")
  .post(validate(topicValidation.addNewTopic), topicController.addNewTopic);

// get,update,delete on topic

router
  .route("/subject/topic/:topic_id")
  .get(validate(topicValidation.getTopicById), topicController.getTopicById)
  .patch(
    validate(topicValidation.updateTopicById),
    topicController.updateTopicById
  )
  .delete(
    validate(topicValidation.deleteTopicById),
    topicController.deleteTopicById
  );

// add question to perticular topic
router
  .route("/topic/:topicId/add-question")
  .post(validate(questionValidation.addQuestion), questionController.addQuestion);

module.exports = router;
