const express = require("express");
const router = express.Router();
const multer = require("multer");

const heroController = require("./../controllers/heroes.controller");

const checkAuth = require("./../middleware/check-auth");

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

router.get("", checkAuth, heroController.getHeroes);
router.get("/names", checkAuth, heroController.getHeroNames);
router.post(
  "",
  checkAuth,
  multer({ storage }).single("image"),
  heroController.addNewHero
);
router.put("/:id", checkAuth, heroController.editHero);
router.delete("/:id", checkAuth, heroController.deleteHero);

module.exports = router;
