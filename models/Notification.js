const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    typeNotification: {
        type: String,
        required: true
    },
    typeUser: {
        type: String,
        required: true
    },
    vue: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Notification', Notification);