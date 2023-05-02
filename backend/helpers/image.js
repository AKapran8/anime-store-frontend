const fs = require("fs");
const path = require("path");

const removeImage = (imageLink) => {
  const imageUrl = imageLink.split("/images/")[1];

  const imagePath = path.join(__dirname, "./../images", imageUrl);
  fs.unlink(imagePath, (err) => {
    if (err) throw new Error("Image not found");
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

const createNewImage = (prevImageName, newImageName) => {
  const prevImageUrl = prevImageName.split("/images/")[1];
  const newImageUrl = newImageName.split("/images/")[1];

  const prevImagePath = path.join(__dirname, "./../images", prevImageUrl);
  const newImagePath = path.join(__dirname, "./../images", newImageUrl);

  fs.readFile(prevImagePath, (err, data) => {
    if (err) throw new Error("Image not found");
    fs.writeFile(newImagePath, data, (err) => {
      if (err) throw new Error("Image can't duplicated");
    });
  });
};

const getNewImageName = (prevUrl, heroName, newAnimeId) => {
  const nameWithoutSpaces = heroName.trim().replace(/\s+/g, "").toLowerCase();
  const storagePathIndex = prevUrl.indexOf("/images/");
  const storagePath = prevUrl.substring(0, storagePathIndex + 8);
  const mimeType = prevUrl.split(".").pop();
  const newImageUrl = `${storagePath}${nameWithoutSpaces}_${newAnimeId}.${mimeType}`;

  return newImageUrl;
};

module.exports = {
  removeImage,
  changeImageName,
  createNewImage,
  getNewImageName,
};
