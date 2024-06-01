

const express = require('express');
const reportsController = require('../controllers/reportController');
const verifyMidleware = require("../midlewares/authjwt");

const reportsRouter = express.Router();


reportsRouter.post('/student/report/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isUser], reportsController.createReport);

reportsRouter.get('/school/reports/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], reportsController.schoolGetReports);

reportsRouter.get('/student/reports/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isUser], reportsController.studentGetReports);

reportsRouter.delete('/student/report/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], reportsController.deleteReport);


module.exports = reportsRouter;
