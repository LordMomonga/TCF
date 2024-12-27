const mongoose  = require('mongoose')
const Notification = require('../models/Notification')

exports.getNotification = async(req, res) => {
    try {
        const notifications = await Notification.find({ utilisateur_id: req.userId, vue: false, typeUser:'user' });

        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

exports.getAllNotification = async(req, res) => {
    try {
        const notifications = await Notification.find({ utilisateur_id: req.userId, typeUser:'user' });

        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};


exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const notification = await Notification.findByIdAndUpdate(notificationId, { vue: true }, { new: true });

        if (!notification) {
            return res.status(404).send({ message: 'Notification non trouvée' });
        }

        return res.status(200).json(notification);
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};



exports.deleteNotification = async(req, res) => {
  
    try{
        userId = req.userId;
    await Notification.remove({_id: userId});
    return res.status(200).send({message: "Test Supprimé"});
} catch (error) {
    return res.status(500).send({message: error});
}

}
