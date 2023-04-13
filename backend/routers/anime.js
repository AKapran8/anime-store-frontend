const express = require('express');
const router = express.Router();

const animeController = require("./../controlers/anime");

router.get("", animeController.getAllAnime);
router.post("", animeController.addNewAnime);
router.put("/:id", animeController.editAnime);
router.delete("/:id", animeController.deleteAnime);

module.exports = router;
