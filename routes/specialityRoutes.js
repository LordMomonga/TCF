

const express = require('express');
const specialityController = require('../controllers/specialityController');
const verifyMidleware = require("../midlewares/authjwt");

const specialityRouter = express.Router();

specialityRouter.post('/school/speciality', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], specialityController.createSpeciality);

specialityRouter.get('/school/specialities', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], specialityController.getSchoolSpecialities);

specialityRouter.delete('/school/speciality/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], specialityController.deleteSpeciality);


module.exports = specialityRouter;

