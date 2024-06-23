const mongoose = require('mongoose');

const TextElement = new mongoose.Schema({
    text1:{
        type:String,
        required:true,
    },
    text2:{
        type:String,
        required:true,
    },
    text3:{
        type:String,
        required:true,
    },
})
module.exports = mongoose.model('TextElement', TextElement);
