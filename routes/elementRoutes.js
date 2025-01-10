const express = require('express');
const elementController = require('../controllers/elementController');
const verifyMidleware = require("../midlewares/authjwt");

const elementRouter = express.Router();

elementRouter.post('/school/element', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.addElement);
elementRouter.get('/school/select/compe/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser],elementController.getComprehensionEcrite);
elementRouter.get('/school/select/compo/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser],elementController.getComprehensionOrale);

module.exports = elementRouter;