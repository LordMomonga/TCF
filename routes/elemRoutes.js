const express = require('express');
const elementController = require('../controllers/elemSujetController');

const verifyMidleware = require("../midlewares/authjwt");

const elemRouter = express.Router();
elemRouter.post('/school/add/elem', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.addElem);
elemRouter.get('/school/elemEcrite', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.getSujetExpressionEcrite);
elemRouter.get('/school/elemOrale', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.getSujetExpressionOrale);

module.exports = elemRouter;
