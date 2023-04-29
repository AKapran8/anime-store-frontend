const express = require("express");
const router = express.Router();

const animeController = require("./../controllers/anime.controller");

const chechAuth = require("./../middleware/check-auth");

router.post("", chechAuth, animeController.getAnime);
router.get("/names", chechAuth, animeController.getAnimeNames);
router.get("/:id", chechAuth, animeController.getAnimeById);
router.post("/add", chechAuth, animeController.addNewAnime);
router.put("/:id", chechAuth, animeController.editAnime);
router.delete("/:id", chechAuth, animeController.deleteAnime);

module.exports = router;
