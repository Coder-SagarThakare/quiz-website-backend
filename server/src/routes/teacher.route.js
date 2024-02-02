const { teacherController } = require("../controllers");
const validate = require("../middlewares/validate");
const { teacherValidation } = require("../validations");

const router = require("express").Router();


// use middleware for authorise teacher
// route.use(auth())


router
  .route("/add-subject")
  .post(
    validate(teacherValidation.addNewSubject),
    teacherController.addNewSubject
  );
    
module.exports = router;
