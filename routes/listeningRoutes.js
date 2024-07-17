const express = require('express')
const listeningController = require('../controllers/listeningSolutionController')
const verifyMidleware = require("../midlewares/authjwt");

const listeningRouter = express.Router();
listeningRouter.post('/addListening', [verifyMidleware.verifyToken, verifyMidleware.isUser], listeningController.addListening);

module.exports = listeningRouter;