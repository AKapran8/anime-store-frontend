const express = require('express');
const router = express.Router();

const quoteController = require("./../controllers/quotes.controller");

router.get("", quoteController.getQuotes);
router.post("", quoteController.addNewQuote);
router.put("/:id", quoteController.editQuote);
router.delete("/:id", quoteController.deleteQuote);

module.exports = router;
