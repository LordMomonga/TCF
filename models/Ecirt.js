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
    }

})

module.exports = mongoose.model('Ecrit', Ecrit);
