const express = require("express");
const router = express.Router();
const GameReview = require('../models/gameReview.js');
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get('/:gameID', async (req, res) => {
    const gamereviews = await GameReview.find({gameID: req.params.gameID});
    return res.send(gamereviews);
});

router.get('/', async (req, res) => {
    const gamereviews = await GameReview.find({});
    return res.send(gamereviews);
});


module.exports = router;