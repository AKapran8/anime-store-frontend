const express = require("express");
const router = express.Router();

const animeController = require("./../controllers/anime.controller");

const checkAuth = require("./../middleware/check-auth");

router.post("", animeController.getAnime);
router.get("/names", checkAuth, animeController.getAnimeNames);
router.get("/:id", checkAuth, animeController.getAnimeById);
router.post("/add", checkAuth, animeController.addNewAnime);
router.put("/:id", checkAuth, animeController.editAnime);
router.delete("/:id", checkAuth, animeController.deleteAnime);
router.post("/copy", checkAuth, animeController.copyAnime);

module.exports = router;
