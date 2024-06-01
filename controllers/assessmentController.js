const Assessment = require('../models/Assessment');
const AssessmentSolution = require('../models/AssessmentSolution');
const Classroom  = require('../models/Classroom');
const AcademicYear = require('../models/AcademicYear');

exports.createAssessment =  async (req,res) => {
    try {

                
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

        // console.log(req.body);
        const data = {
            teacher_id: req.userId,
            ...req.body,
            academic_year: academicYearCheck._id
        }

        let assessment = new Assessment(data);

        await assessment.save();

        return res.status(200).send({message: "Created Assessment"});;

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.updateAssessment = async (req,res) => {
    try {
        // console.log('UPDATE REQ', req.body);

        let assessmentId = req.params.id;
        await Assessment.findOneAndUpdate({_id: assessmentId}, req.body);

        return res.status(200).send({message: "Assessment Updated"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getAssessments = async(req,res) => {
    try {
        let teacherId = req.userId;
        let academicYear = req.params.academic_year_id;

        let allData = await Assessment.find({teacher_id: teacherId, academic_year: academicYear});

        return res.status(200).send({message: "All assessments", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getClassAssessments = async(req,res) => {
    try {
        let teacherId = req.userId;
        let classId  = req.params.classId;
        let academicYear = req.params.academic_year_id;

        let allData = await Assessment.find({teacher_id: teacherId, class_room_id: classId, academic_year: academicYear});

        return res.status(200).send({message: "All assessments", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// // STUDENT
exports.studentGetAllAssessment = async(req,res) => {
    try {
        let classId = req.params.id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        // Because teachers can scheudle an assessment to be make public in a future date
        let allData = await Assessment.find({class_room_id: classId, "publish_date" : { $lte : `${today}`}, "publish_answers_date" : { $gt : `${today}`}});

        return res.status(200).send({message: "All assessment", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

// GET PASS AND PRESENT ASSESSMENT
exports.studentGetTotalAssessment = async(req,res) => {
    try {
        let classId = req.params.id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;


        // For student to be able to see pass and present assessments
        let assessments = await Assessment.find({class_room_id: classId}).populate('class_room_id').populate('teacher_id');

        let allAssessments = [];

        // CHECK IF IT IS DATE TO PUBLISH SOLUTION THEN ALOW SOLUTION FILE ELSE DONT
        assessments.forEach(assessment => {
            if(assessment.publish_answers_date > today) {
                assessment.answers_file = '';
                allAssessments.push(assessment);
            }else {
                allAssessments.push(assessment);
            }
        })

        return res.status(200).send({message: "All assessment", data: allAssessments});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteAssessment = async(req,res) => {
    try {
        let assessmentId = req.params.id;

        await Assessment.findOneAndDelete({_id: assessmentId});

        return res.status(200).send({message: "Assessment Deleted"});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.submitAssessmentSolution = async (req,res) => {
    try {
        console.log('SUBMIT ASSESSMENT SOLUTION')
        let studentId = req.userId;
        let data = req.body;
        let academicYear = req.params.academic_year_id;

        // CHECK IF ALREADY SUBMITED
        let check = await AssessmentSolution.findOne({student_id: studentId, assessment_id: data.assessment_id});

        if(check) {
            // console.log("CHECK: ",check)
            return res.status(400).send({ message: "Failed! You already submited a solution" });
        }

        let finalData = {
            ...data,
            student_id: studentId,
            academic_year: academicYear
        }

        let content = await Assessment.findOne({_id: data.assessment_id});


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if(today >= content.publish_answers_date) {
            console.log('Submit assignment date has been exceeded');
            return res.status(400).send({message: 'Submit assessment date has been exceeded'})
        }

        let solution = new AssessmentSolution(finalData);

        await solution.save();

        return res.status(200).send({message: "Solution Submitted Successfuly"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}


exports.studentGetSolutions = async(req,res) => {
    try {
        const studId = req.userId;
        let academicYear = req.params.academic_year_id;


        let solutions = await AssessmentSolution.find({student_id: studId, academic_year: academicYear}).populate('assessment_id').populate('classroom_id')
        
        return res.status(200).send({message: "Student Assessment Solutions", data: solutions});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}


exports.getAllAssessmentSolutions = async(req,res) => {
    try {
        let assessmentId = req.params.id;
        let academicYear = req.params.academic_year_id;

        let solutions = await AssessmentSolution.find({assessment_id: assessmentId, academic_year: academicYear}).populate('assessment_id').populate('classroom_id').populate("student_id");
        
        return res.status(200).send({message: "All Student Solutions", data: solutions});
    
    } catch (error) {
        return res.status(500).send({message: error});
    }
}



exports.submitAssessmentScore = async(req,res) => {
    let assessmentSolutionId = req.params.id;

    try {
        await AssessmentSolution.findOneAndUpdate({_id: assessmentSolutionId}, req.body);

        return res.status(200).send({message: "Student Assessment Score Added"})
    } catch (error) {
        return res.status(400).send({message: error});
    }
}