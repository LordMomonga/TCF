const express = require('express');
const elementController = require('../controllers/elemSujetController');

const verifyMidleware = require("../midlewares/authjwt");

const elemRouter = express.Router();
elemRouter.post('/school/add/elem', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.addElem);
elemRouter.get('/school/elemEcrite/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], elementController.getSujetExpressionEcrite);
elemRouter.get('/school/elemOrale/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], elementController.getSujetExpressionOrale);

module.exports = elemRouter;
