const FeesDeadline = require('../models/FeesDeadline');
const StudentInfo = require('../models/StudentInfo');

exports.createDeadline = async(req,res) => {
    try {

        let data = {
            ...req.body,
        };

        let deadlineInfo = new FeesDeadline(data);

        await deadlineInfo.save();

        return res.status(200).send({message: "Fees Deadline Created"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.suspendStudents = async(req,res) => {
    try {
        console.log('suspend students')
        let academicYear = req.params.academic_year_id;
        let deadlineId = req.params.id;

        let deadline = await FeesDeadline.findOne({_id: deadlineId,  school_id: schoolId});
        let allSchoolStudents = await StudentInfo.find({school_id: schoolId, academic_year: academicYear});


        // console.log(deadline);
        // console.log('ALL STUDENTS: ',  allSchoolStudents)

        let oweFeesIds = [];

        allSchoolStudents.forEach((stud) => {
            let amtToHavePaid = (parseInt(stud.total_fees) * deadline.amount_percent) / 100;
            console.log('AMOUNT: ', amtToHavePaid);

            if(parseInt(stud.fees_paid) < amtToHavePaid) {
                oweFeesIds.push(stud._id);
            }
        })

        await StudentInfo.findOneAndUpdate({"_id": { $in: oweFeesIds}}, {status: 'suspended'});

        return res.status(200).send({message: "Students Suspended"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}

exports.getSchoolDeadlines = async(req,res) => {
    try {

        let allData = await FeesDeadline.find();

        return res.status(200).send({message: "All Deadline Infos", data: allData});
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.studentGetSchoolDeadlines = async(req,res) => {
    try {
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let student = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear})

        if(!student) {
            return res.status(400).send({message: "Not part of any school"});
        }

        let allData = await FeesDeadline.find({school_id: student.school_id});

        return res.status(200).send({message: "School Deadline Infos", data: allData});
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteDeadline = async(req,res) => {
    try {
        let id = req.params.id;

        await FeesDeadline.findOneAndDelete({_id: id});

        return res.status(200).send({message: "Deadline Deleted"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

