const express = require('express');

const liveSessionController = require('../controllers/liveSessionController');
const verifyMidleware = require("../midlewares/authjwt");


const liveSessionRouter = express.Router();

liveSessionRouter.post('/session/create', [verifyMidleware.verifyToken, verifyMidleware.isTeacher], liveSessionController.createLiveSession);

liveSessionRouter.get('/sessions/:academic_year_id', [verifyMidleware.verifyToken,verifyMidleware.isTeacher], liveSessionController.getLiveSessions);

liveSessionRouter.get('/student/live-sessions/:academic_year_id', [verifyMidleware.verifyToken,verifyMidleware.isStudent], liveSessionController.studentGetLiveSessions);

liveSessionRouter.post('/session/end', [verifyMidleware.verifyToken, verifyMidleware.isTeacher], liveSessionController.endLiveSession);

liveSessionRouter.post('/session/join', [verifyMidleware.verifyToken, verifyMidleware.isStudent], liveSessionController.joinSession);


module.exports = liveSessionRouter;

