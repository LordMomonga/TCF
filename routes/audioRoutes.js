const express = require('express');
const audioController = require("../controllers/audioController");
const verifyMidleware = require("../midlewares/authjwt");

const audioRouter = express.Router();
audioRouter.post('/addAudio', [verifyMidleware.verifyToken, verifyMidleware.isUser], audioController.addAudio);
module.exports = audioRouter;