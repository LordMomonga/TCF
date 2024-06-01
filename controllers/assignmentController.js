const Assignment = require('../models/Assignment');
const AssignmentSolution = require('../models/AssignmentSolution');
const Classroom  = require('../models/Classroom');
const AcademicYear = require('../models/AcademicYear');

exports.createAssignment =  async (req,res) => {
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

        console.log('CREATE ASSIGNMENT');




        // CHECK IF TEACHER IS PERMITED TO TEACH CLASS FOR CURRENT ACADEMIC YEAR
        let permissionCheck = await Classroom.findOne({_id: classId, academic_year: academicYearCheck._id, teacher_id: userId, status: 'accepted'})

        if(!permissionCheck) {
            return res.status(400).send({message: "You don't have permission to teach class"});
        }


        const data = {
            teacher_id: req.userId,
            ...req.body,
            academic_year: academicYearCheck._id
        }

        let assignment = new Assignment(data);

        await assignment.save();

        return res.status(200).send({message: "Created Assignment"});;

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.updateAssignment = async (req,res) => {
    try {
        // console.log('UPDATE REQ', req.body);

        let assignmentId = req.params.id;
        await Assignment.findOneAndUpdate({_id: assignmentId}, req.body);

        return res.status(200).send({message: "Assignment Updated"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getAssignments = async(req,res) => {
    try {
        let teacherId = req.userId;
        let academicYear = req.params.academic_year_id;

        let allData = await Assignment.find({teacher_id: teacherId,  academic_year: academicYear});

        return res.status(200).send({message: "All assignments", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getClassAssignments = async(req,res) => {
    try {
        let teacherId = req.userId;
        let classId  = req.params.classId;
        let academicYear = req.params.academic_year_id;

        let allData = await Assignment.find({teacher_id: teacherId, class_room_id: classId, academic_year: academicYear});

        return res.status(200).send({message: "All class assignment", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// // STUDENT
exports.studentGetAllAssignment = async(req,res) => {
    try {
        let classId = req.params.id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        // Because teachers can scheudle an assignment to be make public in a future date
        let allData = await Assignment.find({class_room_id: classId, "publish_date" : { $lte : `${today}`}, "publish_answers_date" : { $gt : `${today}`}});

        return res.status(200).send({message: "All assignment", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

// GET PASS AND PRESENT ASSIGNMENT
exports.studentGetTotalAssignment = async(req,res) => {
    try {
        let classId = req.params.id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;


        // For student to be able to see pass and present assignments
        let assignments = await Assignment.find({class_room_id: classId}).populate('class_room_id').populate('teacher_id');

        let allAssignments = [];

        // CHECK IF IT IS DATE TO PUBLISH SOLUTION THEN ALOW SOLUTION FILE ELSE DONT
        assignments.forEach(assignment => {
            if(assignment.publish_answers_date > today) {
                assignment.answers_file = '';
                allAssignments.push(assignment);
            }else {
                allAssignments.push(assignment);
            }
        })

        return res.status(200).send({message: "All assignments", data: allAssignments});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteAssignment = async(req,res) => {
    try {
        let assignmentId = req.params.id;

        await Assignment.findOneAndDelete({_id: assignmentId});

        return res.status(200).send({message: "Assignment Deleted"});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.submitAssignmentSolution = async (req,res) => {
    try {
        let studentId = req.userId;
        let data = req.body;
        let academicYear = req.params.academic_year_id;

        // CHECK IF ALREADY SUBMITED
        let check = await AssignmentSolution.findOne({student_id: studentId, assignment_id: data.assignment_id});

        if(check) {
            // console.log("CHECK: ",check)
            return res.status(400).send({ message: "Failed! You already submited a solution" });
        }

        let finalData = {
            ...data,
            student_id: studentId,
            academic_year: academicYear
        }

        let content = await Assignment.findOne({_id: data.assignment_id});


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if(today >= content.publish_answers_date) {
            console.log('Submit assignment date has been exceeded');
            return res.status(400).send({message: 'Submit assignment date has been exceeded'})
        }

        let solution = new AssignmentSolution(finalData);

        await solution.save();

        return res.status(200).send({message: "Solution Submitted Successfuly"});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// GET SOLUTIONS FOR PARTICULAR STUDENT
exports.studentGetAssignmentSolutions = async(req,res) => {
    try {
        const studId = req.userId;

        console.log('Arrived')

        let solutions = await AssignmentSolution.find({student_id: studId}).populate('assignment_id').populate('classroom_id')
        
        return res.status(200).send({message: "Student Assignment Solutions", data: solutions});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}


exports.getAllAssignmenttSolutions = async(req,res) => {
    try {
        let assignmentId = req.params.id;

        let solutions = await AssignmentSolution.find({assignment_id: assignmentId}).populate('assignment_id').populate('classroom_id').populate("student_id");
        
        return res.status(200).send({message: "All Student Solutions", data: solutions});
    
    } catch (error) {
        return res.status(500).send({message: error});
    }
}



exports.submitAssignmentScore = async(req,res) => {
    let assignmentSolutionId = req.params.id;

    try {
        await AssignmentSolution.findOneAndUpdate({_id: assignmentSolutionId}, req.body);

        return res.status(200).send({message: "Student Assignment Score Added"})
    } catch (error) {
        return res.status(400).send({message: error});
    }
}