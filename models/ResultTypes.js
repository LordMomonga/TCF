const mongoose = require('mongoose');

const ResultType = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  
}, { timestamps: true });


module.exports = mongoose.model('ResultType', ResultType);
