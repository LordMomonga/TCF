const mongoose = require('mongoose');

const Speciality = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    
    fees: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
       
    },
}, { timestamps: true });


module.exports = mongoose.model('Speciality', Speciality);