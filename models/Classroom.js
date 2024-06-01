const mongoose = require('mongoose');
const CourseContent  = require('./CourseContent');
const PassExamContent = require('./PassExamContent');
const Participant = require('./Participant');
const Assessment = require('./Assessment');

const Classroom = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teacher_id: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    school_id: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
        default: null
    },
    specialities: [
        {
            ref: 'Speciality',
            type: mongoose.Types.ObjectId,
            required: false,
            default: []
        }
    ],
    class_type: {
        type: String,
        default: 'personal'
    },
    status: {
        type: String,
        default: 'accepted'
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
   
}, { timestamps: true })

Classroom.pre('remove', function(next) {
    CourseContent.remove({classroom_id: this._id}).exec();
    PassExamContent.remove({class_room_id: this._id});
    Participant.remove({class_room_id: this._id});
    Assessment.remove({class_room_id: this._id});
    next();
})

module.exports = mongoose.model('Classroom', Classroom);
