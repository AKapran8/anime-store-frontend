const fs = require("fs");
const path = require("path");

const removeImage = (imageUrl) => {
  const imagePath = path.join(__dirname, "../storage", imageUrl);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const changeImageName = (prevName, newName) => {
  const oldImageName = path.join(__dirname, "../storage", prevName);
  const newImageName = path.join(__dirname, "../storage", newName);

  fs.rename(oldImageName, newImageName, (err) => {
    if (err) throw err;
  });
};

module.exports = { removeImage, changeImageName };
