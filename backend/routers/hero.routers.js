const express = require("express");
const router = express.Router();
const multer = require("multer");

const heroController = require("./../controllers/heroes.controller");

const MIME_TYPE_HELPER = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_HELPER[file.mimetype];
    cb(!isValid ? new Error("Invalid type") : null, "src/assets/heroes");
  },
  filename: (req, file, cb) => {
    const imgName = file.originalname.replace(/\s/g, "").toLowerCase();
    const ext = MIME_TYPE_HELPER[file.mimetype];
    const name = `${imgName}.${ext}`;
    cb(null, name);
  },
});

router.get("", heroController.getHeroes);
router.get("/names", heroController.getHeroNames);
router.post("", multer({ storage }).single("image"), heroController.addNewHero);
router.put("/:id", heroController.editHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;
