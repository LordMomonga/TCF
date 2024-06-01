

const express = require('express');
const resultTypeController = require('../controllers/resultTypeController');
const verifyMidleware = require("../midlewares/authjwt");

const resultTypeRouter = express.Router();

resultTypeRouter.post('/school/result-type', [verifyMidleware.verifyToken, verifyMidleware.isSchool], resultTypeController.createResultType);

resultTypeRouter.get('/school/result-types', [verifyMidleware.verifyToken, verifyMidleware.isSchool], resultTypeController.schoolGetResultTypes);

resultTypeRouter.get('/student/result-types', [verifyMidleware.verifyToken, verifyMidleware.isStudent], resultTypeController.studentGetResultTypes);

resultTypeRouter.delete('/school/result-type/:id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], resultTypeController.deleteResultTypes);


module.exports = resultTypeRouter;

