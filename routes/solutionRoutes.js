

const express = require('express');
const solutionController = require('../controllers/solutionController');
const verifyMidleware = require("../midlewares/authjwt");

const solutionRouter = express.Router();

solutionRouter.post('/followup/solution/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isStudent], solutionController.submitSolution);

solutionRouter.post('/followup/score/:id', [verifyMidleware.verifyToken, verifyMidleware.isTeacher], solutionController.submitSolutionScore);

solutionRouter.get('/followup/student/solutions/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isStudent], solutionController.getStudentSolutions);

solutionRouter.get('/followup/solutions/:id', [verifyMidleware.verifyToken, verifyMidleware.isTeacher], solutionController.getAllStudentSolutions);


module.exports = solutionRouter;

