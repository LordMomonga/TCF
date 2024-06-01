const mongoose = require('mongoose');

const PassExamContent = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publish_date: {
        type: String,
        required: true
    },
    questions_file: {
        type: String,
        required: true
    },
    answers_file: {
        type: String,
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    video_solution_url: {
        type: String,
    },
    class_room_id: {
        type: mongoose.Types.ObjectId,
        ref: "Classroom"
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
    
}, { timestamps: true });


module.exports = mongoose.model('PassExamContent', PassExamContent);