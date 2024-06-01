

const express = require('express');
const passExamContentController = require('../controllers/passExamContentController');
const tokenMidleWare = require("../midlewares/authjwt");

const passExamRouter = express.Router();

passExamRouter.post('/pass-exam',  [tokenMidleWare.verifyToken, tokenMidleWare.isTeacher],  passExamContentController.createPassExamContent);

passExamRouter.get('/pass-exams/:academic_year_id', [tokenMidleWare.verifyToken, tokenMidleWare.isTeacher], passExamContentController.getPassExamContents);

passExamRouter.get('/students/passexams/:id', [tokenMidleWare.verifyToken, tokenMidleWare.isStudent], passExamContentController.studentGetPassExamss);


passExamRouter.delete('/pass-exam/:id', [tokenMidleWare.verifyToken, tokenMidleWare.isTeacher], passExamContentController.deletePassExamCourseContent)

module.exports = passExamRouter;
