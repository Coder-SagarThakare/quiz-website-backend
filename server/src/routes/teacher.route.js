const { subjectController } = require("../controllers");
const validate = require("../middlewares/validate");
const { subjectValidation } = require("../validations");

const router = require("express").Router();

// use middleware for authorise teacher
// route.use(auth())

router
  .route("/add-subject")
  .post(
    validate(subjectValidation.addNewSubject),
    subjectController.addNewSubject
  );

router.route("/subject/:subject_id").post(validate(subjectValidation.addTopic), subjectController.addTopic);

module.exports = router;
