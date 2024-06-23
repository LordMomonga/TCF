const mongoose = require('mongoose');

const ReadingSolution = new mongoose.Schema({
level:{
    type:String,
    required:true
},
point:{
    type:String,
    required:true
},
erreur:[{
    type:String,
    default:null,
}]

})
module.exports = mongoose.model('ReadingSolution', ReadingSolution);
