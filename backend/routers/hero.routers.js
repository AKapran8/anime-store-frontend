const express = require('express');
const router = express.Router();

const heroController = require("./../controllers/heroes.controller");

router.get("/", heroController.getHeroes);
router.get("/names", heroController.getHeroNames);
router.post("", heroController.addNewHero);
router.put("/:id", heroController.editHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;
