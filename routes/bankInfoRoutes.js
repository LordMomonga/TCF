

const express = require('express');
const bankInfoController = require('../controllers/bankInfoController');
const verifyRoleMidleware = require("../midlewares/authjwt");

const bankInfoRouter = express.Router();


bankInfoRouter.post('/school/bank-info',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], bankInfoController.createBankInfo);


bankInfoRouter.get('/school/bank-infos',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], bankInfoController.getBankInfos);

bankInfoRouter.get('/student/bank-infos/:academic_year_id',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isStudent], bankInfoController.studentGetBankInfos);


bankInfoRouter.post('/school/bank-info/:id',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], bankInfoController.updateBankInfo);

bankInfoRouter.delete('/school/bank-info/:id',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSchool], bankInfoController.deleteBankInfo);


module.exports = bankInfoRouter;


