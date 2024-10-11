const express = require('express');
const audioController = require("../controllers/audioController");
const verifyMidleware = require("../midlewares/authjwt");

const audioRouter = express.Router();
audioRouter.post('/addAudio', [verifyMidleware.verifyToken, verifyMidleware.isUser], audioController.addAudio);
audioRouter.get('/getAudio', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioController.getAudio);
audioRouter.get('/getOne/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioController.getOneAudio);
audioRouter.post('/getOneAndUpdate', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], audioController.updateAudio);
audioRouter.get('/student/getOne', [verifyMidleware.verifyToken, verifyMidleware.isUser], audioController.selAudioStudent);

module.exports = audioRouter;