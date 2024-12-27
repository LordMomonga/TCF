const express = require('express')
const notificationController = require('../controllers/NotificationController')
const verifyMidleware = require("../midlewares/authjwt");

const notificationRouter = express.Router();
notificationRouter.get('/student/notification', [verifyMidleware.verifyToken, verifyMidleware.isUser], notificationController.getNotification);
notificationRouter.get('/student/allNotification', [verifyMidleware.verifyToken, verifyMidleware.isUser], notificationController.getAllNotification);
notificationRouter.put('/student/changeNotification/:id', [verifyMidleware.verifyToken, verifyMidleware.isUser], notificationController.markAsRead);
 
module.exports = notificationRouter;
