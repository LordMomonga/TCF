const mongoose = require('mongoose');

const Audio = new mongoose.Schema({
   niveau:{
    type: String,
    default:null
   }, 
    utilisateur_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    audioUrl1:{
        type:String,
        required: true
    },
    audioUrl2:{
        type:String,
        required: true
    },
    audioUrl3:{
        type:String,
        required: true
    },
    Solution:{
        type:String,
        default: null
    }

})

module.exports = mongoose.model('Audio', Audio);
