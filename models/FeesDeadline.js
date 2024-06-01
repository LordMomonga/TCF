const mongoose = require('mongoose');

const FeesDeadline = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount_percent: {
        type: Number,
        required: true
    },
 
}, { timestamps: true });


module.exports = mongoose.model('FeesDeadline', FeesDeadline);
