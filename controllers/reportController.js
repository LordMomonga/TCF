const Announcement = require('../models/Announcement');
const Report = require('../models/Report');
const StudentInfo = require('../models/StudentInfo');
const Timetable = require('../models/Timetable');

exports.createReport = async(req,res) => {
    try {
        console.log('CREATE REPORTS', req.body);
        let studentId = req.userId;
        let accademicYear = req.params.academic_year_id;


        // CHECK IF STUDENT IS PART OF SCHOOL FOR ACADEMIC YEAR

        let check1 = await StudentInfo.findOne({student_id: studentId, academic_year: accademicYear, status: 'accepted'});

        if(!check1) {
            console.log('Failed check one')
            return res.status(400).send({message: "You are not allowed to send messages to school"});
        }


        let data = {
            ...req.body,
            speciality: check1.speciality_id,
            student_id: studentId,
            academic_year: accademicYear
        };

        let report = new Report(data);

        await report.save();

        return res.status(200).send({message: "Report Created"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}

exports.studentGetReports= async(req,res) => {
    try {
        let studentId = req.userId;
        let accademicYear = req.params.academic_year_id;

        let allReports = await Report.find({student_id: studentId, academic_year: accademicYear}).populate('school_id').populate('speciality');

        return res.status(200).send({message: "All student reports", data: allReports});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.schoolGetReports= async(req,res) => {
    try {
        let accademicYear = req.params.academic_year_id;

        let allReports = await Report.find({academic_year: accademicYear}).populate('student_id').populate('speciality');

 
        return res.status(200).send({message: "All reports", data: allReports});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteReport =  async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}