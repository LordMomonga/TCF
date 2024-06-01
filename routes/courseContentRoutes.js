

const express = require('express');
const courseContentController = require('../controllers/courseContentController');
const verifyRoleMidleware = require("../midlewares/authjwt");

const courseContentRouter = express.Router();


courseContentRouter.post('/course-content',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], courseContentController.createCourseContent)

courseContentRouter.get('/course-contents/class/:classId/:academic_year_id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], courseContentController.getClassCourseContent);

courseContentRouter.get('/course-contents/:academic_year_id', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], courseContentController.getCourseContents);

courseContentRouter.get('/course-contents/student/:id/:academic_year_id', [verifyRoleMidleware.verifyToken,verifyRoleMidleware.isStudent], courseContentController.studentGetCourseContent);

courseContentRouter.delete('/course-content/:courseId', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isTeacher], courseContentController.deleteCourseContent);

module.exports =   courseContentRouter;

