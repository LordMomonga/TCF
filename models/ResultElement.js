const mongoose = require('mongoose');
const User = require('./User');

const ResultElement = new mongoose.Schema({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    typeTest:{
        type:String,
        required:true
    },
    genreTest:{
        type:String,
        required:true
    },
    niveau:{
        type:String,
        required:true
    },
    score:{
        type:String,
        required:true
    },
    vue:{
        type:Boolean,
        default:false
    },
    


},{timestamps: true});

module.exports = mongoose.model('ResultElement', ResultElement);