

const express = require('express');
const feesReceiptController = require('../controllers/feesReceiptController');
const verifyMidleware = require("../midlewares/authjwt");

const feespaymentRoutes = express.Router();


feespaymentRoutes.post('/student/receipt/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isUser], feesReceiptController.submitReceipt);

feespaymentRoutes.get('/school/receipts/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], feesReceiptController.schoolGetReceipts);

feespaymentRoutes.get('/student/receipts/:academic_year_id', [verifyMidleware.verifyToken, verifyMidleware.isUser], feesReceiptController.studentGetReceipts);

feespaymentRoutes.post('/school/accept-receipts/:academic_year_id/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], feesReceiptController.schoolAcceptReceipt);

feespaymentRoutes.post('/school/reject-receipts/:academic_year_id/:id', [verifyMidleware.verifyToken, verifyMidleware.isAdmin], feesReceiptController.schoolRejectsReceipt);


feespaymentRoutes.delete('/student/receipt/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], feesReceiptController.deleteReceipt);


module.exports = feespaymentRoutes;
