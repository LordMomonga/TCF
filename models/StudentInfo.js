const mongoose = require('mongoose');


const StudentInfo = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  
    academic_year: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "AccademicYear"
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentResults",
        default: []
    }
    ],
    status: {
        type: String,
        required: true
    },
    fees_paid: {
        type: String,
        default: null
      },
      total_fees: {
        type: String,
        default: null
      },
      speciality_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Speciality'
      },
},{timestamps: true});


module.exports = mongoose.model('StudentInfo', StudentInfo);