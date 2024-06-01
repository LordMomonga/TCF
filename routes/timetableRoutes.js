
const express = require('express');
const timetableController = require('../controllers/timetableController');
const verifyMidleware = require("../midlewares/authjwt");

const timetableRouter = express.Router();


timetableRouter.post('/school/timetable/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], timetableController.createTimeTable);

timetableRouter.get('/school/timetables/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], timetableController.getAllTimetables);

timetableRouter.get('/student/timetables/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isStudent], timetableController.getClassTimetable);

timetableRouter.delete('/school/timetables/:id', [verifyMidleware.verifyToken, verifyMidleware.isSchool], timetableController.getAllTimetables);


module.exports = timetableRouter;
