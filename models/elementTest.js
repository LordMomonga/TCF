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
          default:null,
        }
      ,
      solution2:  
        {
          type: String,
          default:null,
        }
      ,
      solution3:  
        {
          type: String,
          default:null,
        }
      ,
      solution4:  
        {
          type: String,
          default:null,
        }
      ,
    response:{
        type:String,
        required:true
    },

    subValue:[{
     subquestion: {
      type:String,
      default:null,
   },
   subAnswer:{
    type:String,
      default:null,
   }

}],

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
   },
   index: {
    type:Number,
    default:null,
 },
 options: [
  {
      question: { type: String, required: null },
      answer1: { type: String, required: null },
      answer2: { type: String, required: null },
      answer3: { type: String, required: null },
      answer4: { type: String, required: null },
      solution:{type: Number, required: null }
  }
],

   specialitie: {
    type: mongoose.Types.ObjectId,
    default:null,
    ref: 'Speciality'

  }
});

module.exports = mongoose.model("Element", Element);       