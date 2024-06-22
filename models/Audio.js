const mongoose = require('mongoose');

const Audio = new mongoose.Schema({
    nomAudio:{
    type:String,
    required:true

    },
    audioUrl:{
        type:String,
        required: true
    }

})

module.exports = mongoose.model('Audio', Audio);
