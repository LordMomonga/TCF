const StudentInfo = require('../models/StudentInfo');
const Timetable = require('../models/Timetable');

exports.createTimeTable = async(req,res) => {
    try {
        // console.log('CREATE TIMETABLE', req.body);
        let accademicYear = req.params.academic_year_id;

        let data = {
            ...req.body,
            academic_year: accademicYear
        };

        let timeTable = new Timetable(data);

        await timeTable.save();

        return res.status(200).send({message: "Timetable Created"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getAllTimetables = async(req,res) => {
    try {
        let schoolId = req.userId;
        let accademicYear = req.params.academic_year_id;

        let allTimetables = await Timetable.find({school_id: schoolId, academic_year: accademicYear}).populate('specialities');

        return res.status(200).send({message: "All timetables", data: allTimetables});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getClassTimetable = async(req,res) => {
    try {
        console.log('GET STUDENTS TIMETABLE')
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let checkInfo = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear, status: 'accepted'});

        
        if(!checkInfo) {
            return res.status(200).send({message: "No timetable", data: []})
        }

        console.log(checkInfo)

        let allData = await Timetable.find({academic_year: academicYear, specialities: checkInfo.speciality_id}).lean();

        return res.status(200).send({message: "All Timetables", data: allData})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.deleteTimetable =  async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}