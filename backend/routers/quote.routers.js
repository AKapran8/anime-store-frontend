const express = require("express");
const router = express.Router();

const quoteController = require("./../controllers/quotes.controller");

const chechAuth = require("./../middleware/check-auth");

router.get("", chechAuth, quoteController.getQuotes);
router.post("", chechAuth, quoteController.addNewQuote);
router.put("/:id", chechAuth, quoteController.editQuote);
router.delete("/:id", chechAuth, quoteController.deleteQuote);

module.exports = router;
