const express = require('express');
const router = express.Router();

const animeController = require("./../controllers/anime.controller");

const chechAuth = require("./../middleware/check-auth")

router.post("", animeController.getAnime);
router.get("/names", animeController.getAnimeNames);
router.get("/:id", chechAuth, animeController.getAnimeById);
router.post("/add", animeController.addNewAnime);
router.put("/:id", animeController.editAnime);
router.delete("/:id", animeController.deleteAnime);

module.exports = router;
