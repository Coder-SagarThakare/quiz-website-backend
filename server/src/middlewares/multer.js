const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/upload/");
    },
    filename: function (req, file, cb) {
      console.log("file", file);
      // cb(null, `${Date.now()}${file.originalname}`);
      // req.body.path = 
      cb(null, `${file.originalname}`);
    },
  }),
});

// const upload = multer();
module.exports = { upload };