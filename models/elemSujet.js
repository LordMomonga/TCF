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
    required:true,
}

})
module.exports = mongoose.model("ElemSujet", ElemSujet);   