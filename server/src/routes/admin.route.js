const { streamController } = require("../controllers");
const { upload } = require("../middlewares/multer");
const validate = require("../middlewares/validate");
const { streamValidation } = require("../validations");

const router = require("express").Router();



// to add new stream
router
  .route("/add-stream")
  .post(upload.single('stream_img'),validate(streamValidation.addStream), streamController.addStream);

// get update delete stream
router
  .route('/stream/:stream_id')
  .get(streamController.getStreamById)

module.exports = router;
