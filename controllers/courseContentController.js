const CourseContent = require('../models/CourseContent');
const Classroom = require('../models/Classroom');
const AcademicYear = require('../models/AcademicYear');
const StudentInfo = require('../models/StudentInfo');



exports.createCourseContent = async (req,res) => {
    try {
        console.log('CREATE CONTENT');
        // console.log(req.body);

        let userId = req.userId;
        let classId = req.body.classroom_id;
        
        let dataCheck = await Classroom.findOne({_id: req.body.classroom_id});

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
            ...req.body,
            teacher_id: userId,
            academic_year: academicYearCheck._id
        };

        let content = new CourseContent(data);

        await content.save();

        return res.status(200).send({message: "Created Course Content"})
      
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getCourseContents = async(req,res) => {
    try {
        let userId = req.userId;
        let academicYear = req.params.academic_year_id;
        

        let contents = await CourseContent.find({teacher_id: userId, academic_year: academicYear}).populate("classroom_id");

        return res.status(200).send({message: "All Course Contents", data: contents});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

// get student info for academic year and check if status is accepted then proceed if yes
exports.studentGetCourseContent = async (req,res) => {
    try {
        let classId = req.params.id;
        let academicYear = req.params.academic_year_id;
        let userId = req.userId;
        

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        // CHECK IF STUDENT  WAS MEMBER IN THAT YEAR

        let memberCheck = await StudentInfo.findOne({student_id: userId, status: 'accepted', academic_year: academicYear})

        if(!memberCheck) {
            return res.status(400).send({message: "You where not a student during that academic year"});
        }

        // CHECK IF STUDENTS SPECIALITY WAS PPART OF CLASS IN THAT ACADEMIC YEAR
        let classMemberCheck = await Classroom.findOne({ _id: classId, academic_year: academicYear, specialities: memberCheck.speciality_id }).lean();

        if(!classMemberCheck) {
            return res.status(400).send({message: "Student speciality was not part of class in that academic year"});
        }

        let contents = await CourseContent.find({academic_year: academicYear, classroom_id: classId, "publish_date" : { $lte : `${today}`}}).populate("classroom_id");;


        let allContents = [];

        // CHECK IF IT IS DATE TO PUBLISH SOLUTION THEN ALOW SOLUTION FILE ELSE DONT
        contents.forEach(content => {
            if(content?.publish_solution_date > today) {
                content.followup_solution_url = '';
                allContents.push(content);
            }else {
                allContents.push(content);
            }
        })

        return res.status(200).send({message: "All Course Content", data: allContents});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getClassCourseContent = async(req,res) => {

    try {
        let academicYear = req.params.academic_year_id;
        let classId = req.params.classId;

        let contents = await CourseContent.find({academic_year: academicYear,classroom_id: classId}).populate("classroom_id");

        return res.status(200).send({message: "All Class Course Contents", data: contents});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}   


exports.deleteCourseContent = async(req, res) => {
    try {
        
        let courseContentId = req.params.courseId;

        await CourseContent.remove({_id: courseContentId});
        return res.status(200).send({message: "Course Content Deleted"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}