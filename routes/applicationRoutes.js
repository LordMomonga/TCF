const express = require('express');

const applicationsController = require('../controllers/applicationsController');
const verifyMidleware = require("../midlewares/authjwt");


const applicationRouter = express.Router();

applicationRouter.get('/applications', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], applicationsController.getAllApplications);

applicationRouter.get('/applications/student', [verifyMidleware.verifyToken, verifyMidleware.isUser], applicationsController.getStudentApplications);

applicationRouter.post('/applications', [verifyMidleware.verifyToken, verifyMidleware.isStudent], applicationsController.newApplication);

applicationRouter.post('/applications/accept', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], applicationsController.approveApplication);

applicationRouter.post('/applications/reject', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], applicationsController.rejectApplications);

module.exports = applicationRouter;

