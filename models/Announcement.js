const mongoose = require('mongoose');

const Announcement = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    
    specialities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Speciality',
            required: false,
            default: []
        }
    ],
    file_url: {
        type: String,
        default: null
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Announcement', Announcement);
