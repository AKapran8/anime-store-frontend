const express = require('express');
const router = express.Router();

const animeController = require("./../controlers/anime.controler");

router.get("/", animeController.getAnime);
router.get("/names", animeController.getAnimeNames);
router.post("", animeController.addNewAnime);
router.put("/:id", animeController.editAnime);
router.delete("/:id", animeController.deleteAnime);

module.exports = router;
