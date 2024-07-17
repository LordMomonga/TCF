const express = require('express');
const verifyMidleware = require("../midlewares/authjwt");
const ecritController = require('../controllers/ecritController')

const EcritRouter = express.Router()
EcritRouter.post('/addEcrit', [verifyMidleware.verifyToken, verifyMidleware.isUser], ecritController.addEcriture);

module.exports = EcritRouter;