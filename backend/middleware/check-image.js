const multer = require("multer");

const MIME_TYPE_HELPER = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_HELPER[file.mimetype];
    cb(!isValid ? new Error("Invalid type") : null, "backend/images");
  },
  filename: (req, file, cb) => {
    const imgName = file.originalname.replace(/\s/g, "").toLowerCase();
    const ext = MIME_TYPE_HELPER[file.mimetype];
    const name = `${imgName}.${ext}`;
    cb(null, name);
  },
});

module.exports = multer({ storage }).single("image");
