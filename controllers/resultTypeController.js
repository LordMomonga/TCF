const Announcement = require('../models/Announcement');
const Report = require('../models/Report');
const ResultTypes = require('../models/ResultTypes');
const StudentInfo = require('../models/StudentInfo');
const Timetable = require('../models/Timetable');

exports.createResultType = async(req,res) => {
    try {
        console.log('CREATE REPORTS', req.body);
        let schoolId = req.userId;

        let data = {
            ...req.body,
            school_id: schoolId
        }
        
        let resultType = new ResultTypes(data);

        await resultType.save();

        return res.status(200).send({message: "Result Type Created"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}

exports.studentGetResultTypes= async(req,res) => {
    try {
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let check1 = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear})

        if(!check1) {
            return res.status(400).send({messsage: "You where not a student"});
        }

        let resultTypes = await ResultTypes.find({school_id: check1.school_id,});

        return res.status(200).send({message: "All result types", data: resultTypes});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.schoolGetResultTypes = async(req,res) => {
    try {
        let schoolId = req.userId;

        let allTypes = await ResultTypes.find({school_id: schoolId});

 
        return res.status(200).send({message: "All result types", data: allTypes});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteResultTypes =  async(req,res) => {
    try {
        let schoolId = req.userId;
        let id = req.params.id;

        await ResultTypes.findOneAndDelete({_id: id, school_id: schoolId});

        return res.status(200).send({message: "Result Type Deleted"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}