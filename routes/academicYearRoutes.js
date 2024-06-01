const express = require('express');

const academicYearController = require('../controllers/academicYearController');
const verifyMidleware = require("../midlewares/authjwt");


const academicYearRouter = express.Router();

academicYearRouter.post('/school/academic-year', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], academicYearController.createAcademicYear);


academicYearRouter.get('/school/academic-years', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], academicYearController.schoolGAcademicYears);


academicYearRouter.post('/school/stop/academic-year', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], academicYearController.stopAcademicYearStatus);

academicYearRouter.get('/teacher/academic-years', [verifyMidleware.verifyToken, verifyMidleware.isTeacher], academicYearController.teacherGetAcademicYears);

academicYearRouter.get('/user/academic-years', [verifyMidleware.verifyToken, verifyMidleware.isUser], academicYearController.studentGetAcademicYear);



module.exports = academicYearRouter;
