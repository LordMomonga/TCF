const mongoose = require('mongoose');

const Assessment = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publish_date: {
        type: String,
        required: true
    },
    assessment_file: {
        type: String,
        required: true
    },
    answers_file: {
        type: String,
    },
    publish_answers_date: {
        type: String,
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    class_room_id: {
        type: mongoose.Types.ObjectId,
        ref: "Classroom"
    },
    answers_file_type: {
        type: String
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
    
}, { timestamps: true });


module.exports = mongoose.model('Assessment', Assessment);