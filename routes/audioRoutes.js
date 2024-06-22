const express = require('express');
const audioControl = require("../controllers/audioController");
const verifyMidleware = require("../midlewares/authjwt");

const audioRouter = express.Router();
audioRouter.post('/school/add/audio', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioControl.addAudio);
audioRouter.get('/school/audio', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioControl.getAudio);

module.exports = audioRouter;