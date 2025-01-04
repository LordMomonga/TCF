const express = require('express');

const ResultController = require("../controllers/resultController");
const verifyMidleware = require("../midlewares/authjwt");

const resultelementRoute = express.Router();

resultelementRoute.post('/student/type', [verifyMidleware.verifyToken, verifyMidleware.isUser], ResultController.createResult);
resultelementRoute.get('/student/type/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], ResultController.getResultElement);
resultelementRoute.get('/student/comprehension',[verifyMidleware.verifyToken, verifyMidleware.isUser], ResultController.getResultById); 
module.exports = resultelementRoute;