const mongoose = require('mongoose');

const ElemSujet= new mongoose.Schema({
TypeElement: {
    type:String,
    required:true
},
NumeroSujet:{
    type: String,
    required:true

},
titre:{
    type:String,
    required:true,
},
contenu:{
    type:String,
    default:null,
},
document1:{
    type:String,
    default:null,
},
document2:{
    type:String,
    default:null,
},

})
module.exports = mongoose.model("ElemSujet", ElemSujet);   