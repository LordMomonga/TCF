const mongoose = require('mongoose');
const User = require('./User')
const Audio = require('./Audio')

const AudioApplication = new mongoose.Schema({
   status:{
    type:String,
    required: true
   },
   utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
audio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audio",
    required: true
},

})

module.exports = mongoose.model('AudioApplication', AudioApplication);