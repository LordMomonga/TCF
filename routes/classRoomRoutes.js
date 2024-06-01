

const express = require('express');
const classRoomController = require('../controllers/classRoomController');
const verifyRoleMidleware = require("../midlewares/authjwt");
const tokenMidleWare = require("../midlewares/authjwt");


const classRouter = express.Router();


classRouter.post('/create-class',[verifyRoleMidleware.verifyToken], classRoomController.createClassRoom);

classRouter.get('/school/class-request/:academic_year_id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], classRoomController.getTeachersClassRequest);

classRouter.get('/teacher/schools/:academic_year_id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], classRoomController.getTeachersAcceptedSchools);


classRouter.post('/school/teacher/accept/:id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], classRoomController.acceptTeachersRequest);

classRouter.post('/school/teacher/reject/:id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], classRoomController.rejecteachersRequest);

classRouter.get('/classes/:academic_year_id',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], classRoomController.getClasses);

classRouter.get('/teacher/classes/request',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], classRoomController.getPendingClassRequests);

classRouter.get('/student/classes/:academic_year_id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isStudent], classRoomController.getStudentAcceptedClasses);

classRouter.delete('/class/:classroomId',[verifyRoleMidleware.verifyToken], classRoomController.deleteClass);


module.exports =  classRouter;
