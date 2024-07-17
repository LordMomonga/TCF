const mongoose = require('mongoose');

const Sol = new mongoose.Schema({
Audio_id: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "Audio"
},
utilisateur_id:{
    type: mongoose.Types.ObjectId,
    required: true,
     ref: "User"
},
text_id:{
    type: mongoose.Types.ObjectId,
    default:null,
    ref:"TextElement"

},
listening_id:{
    type: mongoose.Types.ObjectId,
    default:null,
    ref:"ListeningSolution"
},
reading_id:{
    type: mongoose.Types.ObjectId,
    default:null,
    ref:"ReadingSolution"
},

correctionAudio:{
    type:String,
    default:null

},
correctionEcrit:{
    type: String, 
    default: null,
}
})
module.exports = mongoose.model('Sol', Sol);
