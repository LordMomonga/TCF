const mongoose = require('mongoose');
const Solution = require('./Solution');
const Document = require('./Document');
const Classroom = require('./Classroom');

const CourseContent = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
    },
    teacher_id: {
      type: mongoose.Types.ObjectId  
    },
    pdf_file_url: {
        type: String
    },
    followup_file_url: {
        type: String,
    },
    followup_solution_url: {
        type: String,
    },
    publish_solution_date: {
        type: String
    },
    classroom_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Classroom'
    },
    publish_date: {
        type: Date,
        required: true
    },
    academic_year: {
        type: String,
        required: true,
        ref: "AccademicYear"
    },
}, { timestamps: true }); 


CourseContent.pre('remove',  function(next){
    Solution.remove({course_content_id: this._id});
    Document.remove({course_content_id: this._id});
    next();
})

module.exports = mongoose.model('CourseContent', CourseContent);