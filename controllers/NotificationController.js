const mongoose  = require('mongoose')
const Notification = require('../models/Notification')

exports.getNotification = async(req, res) => {
    userId = req.userId;



}

exports.deleteNotification = async(req, res) => {
  
    try{
        userId = req.userId;
    await Notification.remove({_id: userId});
    return res.status(200).send({message: "Test Supprimé"});
} catch (error) {
    return res.status(500).send({message: error});
}

}
