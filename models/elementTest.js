const mongoose = require('mongoose');

const Element = new mongoose.Schema({
    level:{
        type: String,
        required:true
    },
  questions:  [
        {
          type: String,
          required: true
        }
      ],
    response:{
        type:String,
        required:true
    }
    ,

    imageUrl: {
        type:String,
        require: true,
    }
});

module.exports = mongoose.model("Element", Element);   