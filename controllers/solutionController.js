const Solution = require('../models/Solution');
const CourseContent = require('../models/CourseContent');

exports.submitSolution = async(req,res) => {
    try {
        let studentId = req.userId;
        let data = req.body;
        let academicYearId = req.params.academic_year_id;

        // CHECK IF ALREADY SUBMITED
        let check = await Solution.findOne({student_id: studentId, course_content_id: data.course_content_id});

        if(check) {
            console.log("CHECK: ",check)
            return res.status(400).send({ message: "Failed! You already submited a solution" });
        }

        let finalData = {
            ...data,
            student_id: studentId,
            academic_year: academicYearId
        }

        let content = await CourseContent.findOne({_id: data.course_content_id});


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if(today >= content.publish_solution_date) {
            console.log('Submit followup date has been exceeded');
            return res.status(400).send({message: 'Submit followup date has been exceeded'})
        }

        let solution = new Solution(finalData);

        await solution.save();

        return res.status(200).send({message: "Solution Submitted Successfuly"});

    } catch (error) {
        console.log('ERROR SAVING', error);
        return res.status(500).send({message: error});
    }
}


exports.getStudentSolutions = async(req,res) => {
    try {
        const studId = req.userId;
        let academicYear = req.params.academic_year_id;

        // CHECK IIF STUDENT SSTATUS IS ACCEPTED BEFORE RETURNING CONTENT
        

        let solutions = await Solution.find({student_id: studId, academic_year: academicYear}).populate('course_content_id').populate('classroom_id')
        
        return res.status(200).send({message: "Student Solutions", data: solutions});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getAllStudentSolutions = async(req,res) => {
    try {
        let courseContentId = req.params.id;

        let solutions = await Solution.find({course_content_id: courseContentId}).populate('course_content_id').populate('classroom_id').populate("student_id");
        
        return res.status(200).send({message: "All Student Solutions", data: solutions});
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.submitSolutionScore = async(req,res) => {
    let solutionId = req.params.id;

    try {
        await Solution.findOneAndUpdate({_id: solutionId}, req.body);

        return res.status(200).send({message: "Student Score Added"})
    } catch (error) {
        return res.status(400).send({message: error});
    }
}