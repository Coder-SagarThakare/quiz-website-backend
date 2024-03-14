const { streamController } = require("../controllers");
const auth = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const validate = require("../middlewares/validate");
const { streamValidation } = require("../validations");

const router = require("express").Router();

// authenticate user has rights of admin or not ?
router.use(auth('admin'))

// to add new stream
router
  .route("/add-stream")
  .post(upload.single('streamImg'), validate(streamValidation.addStream), streamController.addStream);

// get update delete stream
router
  .route('/stream/:streamId')
  .get(validate(streamValidation.getStreamById),streamController.getStreamById)
  .patch(validate(streamValidation.updateStreamById),streamController.updateStreamById)   // add validations
  .delete(validate(streamValidation.deleteStreamById),streamController.deleteStreamById)  // add validations


module.exports = router;
