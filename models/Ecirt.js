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
    note:{
        type:String,
        default:null
    }, 
    stat:{
        type:String,
        default:"pending"
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
    commentaire:{
        type:String,
        default:null,
    },


}, { timestamps: true })

module.exports = mongoose.model('Ecrit', Ecrit);
