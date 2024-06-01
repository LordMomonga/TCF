const mongoose = require('mongoose');

const Solution = new mongoose.Schema({
    course_content_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "CourseContent"
    },
    comment: {
        type: String
    },
    classroom_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Classroom'
    },
    document_url: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true,
        ref: "User"
    },
    score: {
        type: Number,
        default: null
    },
    total_score: {
        type: Number,
        default: null
    },
    marked_script_file: {
        type: String,
        default: null
    },
    remark: {
        type: String,
        default: null
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Solution', Solution);
