const express = require('express');
const elementController = require('../controllers/elementController');
const verifyMidleware = require("../midlewares/authjwt");

const elementRouter = express.Router();

elementRouter.post('/school/element', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], elementController.addElement);

module.exports = elementRouter;