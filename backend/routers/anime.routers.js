const express = require('express');
const router = express.Router();

const animeController = require("./../controllers/anime.controller");

router.post("", animeController.getAnime);
router.get("/names", animeController.getAnimeNames);
router.get("/:id", animeController.getAnimeById);
router.post("/add", animeController.addNewAnime);
router.put("/:id", animeController.editAnime);
router.delete("/:id", animeController.deleteAnime);

module.exports = router;
