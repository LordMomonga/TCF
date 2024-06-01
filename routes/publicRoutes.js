
const express = require('express');
const publicController = require('../controllers/publicController');

const publicRouter = express.Router();


publicRouter.get('/public/schools', publicController.getSchoolsPublic);

publicRouter.get('/public/specialites/:id', publicController.getSpecialitiesPublic);

module.exports = publicRouter;


