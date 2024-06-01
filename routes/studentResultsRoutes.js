

const express = require('express');
const studentResultsController = require('../controllers/studentResultsController');
const verifyMidleware = require("../midlewares/authjwt");

const studentResultsRouter = express.Router();

studentResultsRouter.post('/school/student-result/:id/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], studentResultsController.createStudentResults);

studentResultsRouter.get('/student-results/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isStudent], studentResultsController.studentGetResults);


module.exports = studentResultsRouter;

