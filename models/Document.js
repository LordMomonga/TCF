const mongoose = require('mongoose');

const Document = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    course_content_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AcademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Document', Document);