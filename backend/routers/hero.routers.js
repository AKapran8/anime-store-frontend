const express = require("express");
const router = express.Router();
const multer = require("multer");

const heroController = require("./../controllers/heroes.controller");

const chechAuth = require("./../middleware/check-auth");

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

router.get("", chechAuth, heroController.getHeroes);
router.get("/names", chechAuth, heroController.getHeroNames);
router.post(
  "",
  chechAuth,
  multer({ storage }).single("image"),
  heroController.addNewHero
);
router.put("/:id", chechAuth, heroController.editHero);
router.delete("/:id", chechAuth, heroController.deleteHero);

module.exports = router;
