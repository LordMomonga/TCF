const mongoose = require('mongoose');

const Audio = new mongoose.Schema({
    nomAudio:{
    type:String,
    required:true

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
    }

})

module.exports = mongoose.model('Audio', Audio);
