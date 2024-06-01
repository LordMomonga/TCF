const mongoose = require('mongoose');

const AssessmentSolution = new mongoose.Schema({
    assessment_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Assessment"
    },
    classroom_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Classroom'
    },
    comment: {
        type: String
    },
    document_url: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    total_score: {
        type: Number
    },
    marked_script_file: {
        type: String,
    },
    remark: {
        type: String,
    },
    student_id: {
        type: String,
        required: true,
        ref: "User"
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AcademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('AssessmentSolution', AssessmentSolution);
