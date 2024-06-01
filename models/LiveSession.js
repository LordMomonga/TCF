const mongoose = require('mongoose');


const LiveSession = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Classroom"
    },
    meeting_code: {
        type: String,
        required: true
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    status: {
        type: String,
        required: true
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true })


module.exports = mongoose.model('LiveSession', LiveSession);
