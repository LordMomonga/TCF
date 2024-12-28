const mongoose  = require('mongoose')
const Notification = require('../models/Notification')


exports.handleNotification =  (label, id, niveau)=> {
        try {
            const notification = new Notification({
                       utilisateur_id: id,  // Assurez-vous d'envoyer l'ID de l'utilisateur qui doit recevoir la notification
                       typeNotification: label,
                       typeUser:niveau,
                       vue: false // La notification est par défaut non vue
            
                   });
                    notification.save(); 
                   console.log('a la recherche', notification, solution);
    
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    };

