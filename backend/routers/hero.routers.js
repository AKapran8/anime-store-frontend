const express = require("express");
const router = express.Router();

const heroController = require("./../controllers/heroes.controller");

const checkAuth = require("./../middleware/check-auth");
const checkImage = require("./../middleware/check-image");

router.get("", checkAuth, heroController.getHeroes);
router.get("/names", checkAuth, heroController.getHeroNames);
router.post("", checkAuth, checkImage, heroController.addNewHero);
router.put("/:id", checkAuth, heroController.editHero);
router.delete("/:id", checkAuth, heroController.deleteHero);

module.exports = router;
