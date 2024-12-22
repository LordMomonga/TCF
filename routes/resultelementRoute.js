const express = require('express');

const ResultController = require("../controllers/resultController");
const verifyMidleware = require("../midlewares/authjwt");

const resultelementRoute = express.Router();

resultelementRoute.post('/student/type', [verifyMidleware.verifyToken, verifyMidleware.isUser], ResultController.createResult);
resultelementRoute.get('/student/type', [verifyMidleware.verifyToken, verifyMidleware.isUser], ResultController.getResultElement);

module.exports = resultelementRoute;