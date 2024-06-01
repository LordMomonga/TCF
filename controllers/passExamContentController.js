const PassExamContent = require('../models/PassExamContent')
const Classroom  = require('../models/Classroom');
const AcademicYear = require('../models/AcademicYear');



exports.createPassExamContent = async (req,res) => {
    try {
        console.log('CREATE PASS EXAM CONTENT');

        let userId = req.userId;
        let classId = req.body.class_room_id;

        
        
        let dataCheck = await Classroom.findOne({_id: classId});

        if(!dataCheck) {
            return res.status(400).send({message: "Classroom does not exist"})
        }

 
        let academicYearCheck = await AcademicYear.findOne({school_id: dataCheck.school_id, status: 'ongoing'});

        if(!academicYearCheck) {
            return res.status(400).send({message: "School has no ongoing academic year"});
        }



        // CHECK IF TEACHER IS PERMITED TO TEACH CLASS FOR CURRENT ACADEMIC YEAR
        let permissionCheck = await Classroom.findOne({_id: classId, academic_year: academicYearCheck._id, teacher_id: userId, status: 'accepted'})

        if(!permissionCheck) {
            return res.status(400).send({message: "You don't have permission to teach class"});
        }

        let data = {
            teacher_id: userId,
            ...req.body,
            academic_year: academicYearCheck._id
        };

        let content = new PassExamContent(data);

        await content.save();

        return res.status(200).send({message: "Created Pass Exam Content"})
      
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getPassExamContents = async(req,res) => {
    console.log('GET PASS EXAMS');
    try {
        let academicYear = req.params.academic_year_id;
        let userId = req.userId;

        let contents = await PassExamContent.find({teacher_id: userId, academic_year: academicYear}).populate('class_room_id');

        return res.status(200).send({message: "All Pass Exam Contents", data: contents});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.studentGetPassExamss = async(req,res) => {
    console.log('GET PASS EXAMS');
    try {
        let classId = req.params.id;

        let contents = await PassExamContent.find({class_room_id: classId}).populate('teacher_id');

        return res.status(200).send({message: "All Pass Exam Contents", data: contents});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.deletePassExamCourseContent = async(req, res) => {
    try {
        
        let contentId = req.params.id;

        await PassExamContent.remove({_id: contentId});

        return res.status(200).send({message: "Pass Exam Course Content Deleted"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}
