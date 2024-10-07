const express = require('express');
const audioController = require("../controllers/audioController");
const verifyMidleware = require("../midlewares/authjwt");

const audioRouter = express.Router();
audioRouter.post('/addAudio', [verifyMidleware.verifyToken, verifyMidleware.isUser], audioController.addAudio);
audioRouter.get('/getAudio', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioController.getAudio);

module.exports = audioRouter;