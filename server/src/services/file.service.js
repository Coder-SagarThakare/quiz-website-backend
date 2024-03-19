const fs = require("fs");

const deleteLocalFile = (path) => {
  fs.unlink(path, (error) => {
    if (error) {
      console.error("Error deleting local file:", error);
    } else {
        console.log("Local file deleted successfully:", path);
        return;
    }
  });
};

module.exports = { deleteLocalFile };
