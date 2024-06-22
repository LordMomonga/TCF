const mongoose = require('mongoose');
const User = require('./User');
const Resultat = new mongoose.Schema({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    typeTest:{
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
    }

},{timestamps: true});
module.exports = mongoose.model('Resultat', Resultat);