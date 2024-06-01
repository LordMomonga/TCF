const mongoose = require('mongoose');

const Report = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
  
    speciality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speciality"
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Report', Report);
