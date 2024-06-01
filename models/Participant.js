const mongoose = require('mongoose');

const Participant = new mongoose.Schema({
    
    student_count: {
        type: String,
        required: true
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Participant', Participant);