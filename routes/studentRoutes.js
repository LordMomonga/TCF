

const express = require('express');
const studentsController = require('../controllers/studentsController');
const verifyMidleware = require("../midlewares/authjwt");

const studentsRouter = express.Router();



studentsRouter.post('/school/students/apply', [verifyMidleware.verifyToken, verifyMidleware.isUser], studentsController.submitApplication);

studentsRouter.get('/student/applications', [verifyMidleware.verifyToken, verifyMidleware.isUser], studentsController.studentGetApplications);

studentsRouter.get('/school/students/all/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], studentsController.getSchoolAcceptedStudents);

studentsRouter.get('/school/students/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], studentsController.getSchoolStudents);

studentsRouter.post('/school/student/accept/:id/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], studentsController.acceptStudentsApplication);

studentsRouter.post('/school/student/reject/:id/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], studentsController.rejectStudentApplication);

studentsRouter.post('/school/student/suspend/:id/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], studentsController.suspendStudent);

module.exports = studentsRouter;
