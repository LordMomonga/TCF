const mongoose = require('mongoose');

const Timetable = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active_from: {
        type: String,
        required: true
    },
   
    active_to: {
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
        type: String
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true });


module.exports = mongoose.model('Timetable', Timetable);
