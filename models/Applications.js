const mongoose = require('mongoose');
const User = require('./User');


const Applications = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Classroom",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AcademicYear"
    }, 
},{timestamps: true});


module.exports = mongoose.model('Applications', Applications);