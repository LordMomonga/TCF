const mongoose = require('mongoose');

const Element = new mongoose.Schema({
    level:{
        type: String,
        required:true
    },
    question:{
      type: String,
      required:true
    }
    ,
  solution1:  
        {
          type: String,
          required: true
        }
      ,
      solution2:  
        {
          type: String,
          required: true
        }
      ,
      solution3:  
        {
          type: String,
          required: true
        }
      ,
      solution4:  
        {
          type: String,
          required: true
        }
      ,
    response:{
        type:String,
        required:true
    },
    typeElement:{
      type:String,
      required:true
    },

    imageUrl: {
        type:String,
        default:null
    },
    audioUrl: {
      type: String, 
      default:null,
    },
    numero: {
      type:Number,
      default:null,
   }
});

module.exports = mongoose.model("Element", Element);       