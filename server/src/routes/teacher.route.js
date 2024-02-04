const { subjectController } = require("../controllers");
const validate = require("../middlewares/validate");
const { subjectValidation } = require("../validations");

const router = require("express").Router();

// use middleware for authorise teacher
// route.use(auth())


// to add a new subject
router
  .route("/add-subject")
  .post(validate(subjectValidation.addNewSubject), subjectController.addNewSubject);

// get ,delete subject
router.route('/subject/:subject_id')
  .get(validate(subjectValidation.getSubjectById), subjectController.getSubjectById)
  .post(validate(subjectValidation.updateSubjectById), subjectController.updateSubjectById)
  .delete(validate(subjectValidation.deleteSubjectById), subjectController.deleteSubjectById)

// add topics to perticular subject 
router.route("/subject/:subject_id/add-topic")
  .post(validate(subjectValidation.addTopic), subjectController.addTopic)


module.exports = router;
