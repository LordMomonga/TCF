const express = require('express');
const verifyMidleware = require("../midlewares/authjwt");
const ecritController = require('../controllers/ecritController')

const EcritRouter = express.Router()
EcritRouter.post('/addEcrit', [verifyMidleware.verifyToken, verifyMidleware.isUser], ecritController.addEcriture);
EcritRouter.get('/getEcrit', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], ecritController.getEcriture);
EcritRouter.get('/getOneEcrit/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], ecritController.getOneEcriture);
EcritRouter.post('/getOneEcritAndUpdate/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], ecritController.updateEcrit);
EcritRouter.get('/getEcritStudent', [verifyMidleware.verifyToken, verifyMidleware.isUser], ecritController.selEcritStudent);

module.exports = EcritRouter;