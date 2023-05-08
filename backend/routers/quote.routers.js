const express = require("express");
const router = express.Router();

const quoteController = require("./../controllers/quotes.controller");

const checkAuth = require("./../middleware/check-auth");

router.get("", checkAuth, quoteController.getQuotes);
router.post("", checkAuth, quoteController.addNewQuote);
router.put("/:id", checkAuth, quoteController.editQuote);
router.delete("/:id", checkAuth, quoteController.deleteQuote);

module.exports = router;
