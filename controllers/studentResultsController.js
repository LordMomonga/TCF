const StudentInfo = require("../models/StudentInfo");
const StudentResults = require("../models/StudentResults");


exports.createStudentResults = async (req, res) => {
    const schoolId = req.userId;
    let academicYear = req.params.academic_year_id;
    let studentId = req.params.id;

    console.log('CREATE RESULT')
    
    try {

        console.log('STUDENT: ', studentId);
        console.log('Academic Year: ', academicYear);
        
        let check1  = await StudentInfo.findOne({academic_year: academicYear, school_id: schoolId, student_id: studentId}).populate('results');
        
        if(!check1) {
            return res.status(400).send({message: "Student does not exist"});
        }
        
        let hasResult = false;
        
        for(let i = 0; i < check1.results.length; i++) {
            if(check1.results[i].result_type == req.body.result_type ) {
                hasResult = true;
                break;
            }
        }
    
        if(hasResult) {
            return res.status(400).send({message: "Student already have a result for this"});
        }
    
        // GET ID
        let result = new StudentResults(req.body);
        let resultId = result._id;
    
        // SAVE RESULT
        await result.save();
    
        // ADD ID INTO STUDENT LIST OF RESULTS
        await StudentInfo.findOneAndUpdate({academic_year: academicYear, school_id: schoolId, student_id: studentId}, { $push: {results: resultId}});
        
        return res.status(200).send({message: "Student Result Submited"});

    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }

}


exports.getStudentsResults = async(req,res) => {
    const schoolId = req.userId;
    let academicYear = req.params.academic_year_id;

    try {
        let allResults = await StudentInfo.find({academic_year: academicYear, school_id: schoolId}).populate('results').populate('result_type')

        return res.status(200).send({message: "All results", data: allResults});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.studentGetResults = async(req,res) => {
    try {
        // GET STUDENT INFO AND POPULATE RESULTS AND RESULTS TYPE
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let allData = await StudentInfo.findOne({academic_year: academicYear, student_id: studentId}).populate({
            path: 'results',
            populate: {
                path: 'result_type'
              }
        })

        let finalData = allData.results;

        console.log('ALL RESULT DATA', allData);

        return res.status(200).send({message: "All Results", data: finalData});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}