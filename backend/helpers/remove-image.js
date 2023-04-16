const fs = require("fs");
const path = require("path");


const removeImage = (imageUrl) => {
  const imagePath = path.join(__dirname, "../../src/assets/heroes", imageUrl);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = removeImage;
