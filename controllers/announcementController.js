const Announcement = require('../models/Announcement');
const StudentInfo = require('../models/StudentInfo');
const Timetable = require('../models/Timetable');

exports.createAnnouncemment = async(req,res) => {
    try {
        // console.log('CREATE ANNOUNCEMENT', req.body);
        let accademicYear = req.params.academic_year_id;

        let data = {
            ...req.body,
            academic_year: accademicYear
        };

        let announcement = new Announcement(data);

        await announcement.save();

        return res.status(200).send({message: "Announcement Created"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getAnnouncements = async(req,res) => {
    try {
        let accademicYear = req.params.academic_year_id;

        let allTimetables = await Announcement.find({ academic_year: accademicYear}).populate('specialities');

        return res.status(200).send({message: "All announcements", data: allTimetables});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getClassAnnouncements = async(req,res) => {
    try {
        console.log('GET STUDENTS ANNOUNCEMENTS')
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let checkInfo = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear, $or: [{ status: 'accepted'},{status: 'suspended'}]});
     
        if(!checkInfo) {
            return res.status(200).send({message: "No announcement", data: []})
        }

        console.log(checkInfo)

        let allData = await Announcement.find({academic_year: academicYear, specialities: checkInfo.speciality_id}).lean();

        return res.status(200).send({message: "All Announcement", data: allData})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.deleteAnnouncements =  async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}