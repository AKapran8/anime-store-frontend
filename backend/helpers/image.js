const fs = require("fs");
const path = require("path");

const removeImage = (imageLink) => {
  const imageUrl = imageLink.split("/images/")[1];

  const imagePath = path.join(__dirname, "./../images", imageUrl);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const changeImageName = (prevImgLink, newImgLink) => {
  const prevImgUrl = prevImgLink.split("/images/")[1];
  const newImgUrl = newImgLink.split("/images/")[1];

  const oldImageName = path.join(__dirname, "./../images", prevImgUrl);
  const newImageName = path.join(__dirname, "./../images", newImgUrl);

  fs.rename(oldImageName, newImageName, (err) => {
    if (err) throw err;
  });
};

module.exports = { removeImage, changeImageName };
