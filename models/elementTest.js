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
  solutions:  [
        {
          type: String,
          required: true
        }
      ],
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
      default:null
    },
    numero: {
      type:Number,
      default:null

    }
});

module.exports = mongoose.model("Element", Element);       