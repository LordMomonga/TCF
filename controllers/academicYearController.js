const AcademicYear = require('../models/AcademicYear');
const Classroom = require('../models/Classroom');
const StudentInfo = require('../models/StudentInfo');

// ongoing, ended
exports.createAcademicYear = async(req,res) => {
    try {
        console.log('CREATE ACADEMIC YEAR', req.body);

        let data = {
            ...req.body,
        };

        let check = await AcademicYear.findOne({ status: 'ongoing'});

        if(check) {
            return res.status(400).send({message: "You have an ongoing academic year"});
        }

        let academicYear = new AcademicYear(data);

        await academicYear.save();

        return res.status(200).send({message: 'Academic Year Created'})

    } catch (error) {
        return res.status(500).send({message: "Error rejecting application"})
    }
}


exports.schoolGAcademicYears = async(req,res) => {
    try {
      

        let allData = await AcademicYear.find();

        return res.status(200).send({message: 'All academic years', data: allData.reverse()})

    } catch (error) {
        return res.status(500).send({message: "Error rejecting application"})
    }
}


exports.stopAcademicYearStatus = async(req,res) => {
    try {

        await AcademicYear.findOneAndUpdate({ status: 'ongoing'}, {status: 'ended'});

        return res.status(200).send({message: "l'année academique à pris fin"})
    } catch (error) {
        return res.status(500).send({message: "Error rejecting application"})
    }
}



// TEACHER GET ACADEMIC YEARS

exports.teacherGetAcademicYears = async(req,res) => {
    try {
        let teacherId =  req.userId;

        let allData = await Classroom.find({teacher_id: teacherId}).populate('academic_year');

        let allAcademicYears = [];
        let existingIds = [];

        allData.forEach(val => {
            if(existingIds.indexOf(val.academic_year._id) < 0) {
                allAcademicYears.push(val.academic_year);
                existingIds.push(val.academic_year._id);
            }
        });

        // console.log('teacher get academic years', allAcademicYears);
        // console.log('IDS: ', existingIds.indexOf(allAcademicYears[0]._id) < 0);
        return res.status(200).send({message: "All teachers academic year", data: allAcademicYears.reverse()})

    } catch (error) {
        return res.status(500).send({message: "Error getting academic years"})
    }
}


// STUDENTS GET ACADEMIC YEAR

exports.studentGetAcademicYear = async(req,res) => {
    try {
        let studentId = req.userId;


        let allInfo = await StudentInfo.find({student_id: studentId, status: 'accepted' }).populate('academic_year');
        let allSuspendedInfo = await StudentInfo.find({student_id: studentId, status: 'suspended' }).populate('academic_year');

        let allAcademicYears = [];

        allInfo.forEach(val => {
            allAcademicYears.push(val.academic_year);
        });

        allSuspendedInfo.forEach(val => {
            allAcademicYears.push(val.academic_year);
        });


        console.log(allAcademicYears);

        return res.status(200).send({message: "All student academic years", data: allAcademicYears.reverse()})
    } catch (error) {
        return res.status(500).send({message: "Error getting academic years"})
    }
}

