const mongoose = require('mongoose');

const Ecrit = new mongoose.Schema({
   
    utilisateur_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    
    contenu1:{
        type:String,
        required: true
    },
    contenu2:{
        type:String,
        required: true
    },
    contenu3:{
        type:String,
        required: true
    }, 
    contenu1_id:{
        type: mongoose.Types.ObjectId,
                 ref: "ElemSujet"
    }, 
    contenu2_id:{
        type: mongoose.Types.ObjectId,
        ref: "ElemSujet"
    }, 
    contenu3_id:{
        type: mongoose.Types.ObjectId,
         ref: "ElemSujet"
    }, 


})

module.exports = mongoose.model('Ecrit', Ecrit);
