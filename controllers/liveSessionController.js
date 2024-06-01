const LiveSession = require('../models/LiveSession');
const Application = require('../models/Applications');

const randomString = require('../utils/randomString');
const Classroom = require('../models/Classroom');
const AcademicYear = require('../models/AcademicYear');
const StudentInfo = require('../models/StudentInfo');

exports.createLiveSession = async (req, res) => {
    try {
        console.log('CREATE SESSION', req.body);
        let code = randomString.randomValueHex(8);
        let userId = req.userId;

        let data = {
            ...req.body,
            teacher_id: userId,
            meeting_code: code
        }

        let dataCheck = await Classroom.findOne({_id: data.classroom_id});

        if(!dataCheck) {
            return res.status(400).send({message: "Classroom does not exist"})
        }

        console.log('pass class check', dataCheck);

        let academicYearCheck = await AcademicYear.findOne({school_id: dataCheck.school_id, status: 'ongoing'});

        if(!academicYearCheck) {
            return res.status(400).send({message: "School has no ongoing academic year"});
        }

        // CHECK IF TEACHER IS PERMITED TO TEACH CLASS FOR CURRENT ACADEMIC YEAR
        let permissionCheck = await Classroom.findOne({_id: data.classroom_id, academic_year: academicYearCheck._id, teacher_id: userId, status: 'accepted'})

        if(!permissionCheck) {
            return res.status(400).send({message: "You don't have permission to teach class"});
        }

        // CHECK IF TEACHER HAS ANY ONGOING SESSION
        let check = await LiveSession.findOne({teacher_id: userId, status: 'Active'});

        if(check) {
            return res.status(400).send({message: "You currently have an ongoing session"})
        }

        data.academic_year = academicYearCheck._id;

        let meetingSession = new LiveSession(data);

        await meetingSession.save();

        return res.status(200).send({message: "Live Session Created"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}

exports.getLiveSessions = async (req,res) => {
    try {
        let teacherId = req.userId;
        let academicYear = req.params.academic_year_id;

        let allData = await LiveSession.find({teacher_id: teacherId,academic_year: academicYear}).populate('classroom_id').populate('participants');

        return res.status(200).send({message: "All Live Sessions", data: allData})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.studentGetLiveSessions = async (req,res) => {
    try {
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let studentInfo = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear, status: 'accepted'})
        let specialityId = studentInfo.speciality_id;

        console.log('STUDENT INFO: ', specialityId);

        // GET ALL STUDENT CLASSES;
        let classes = await Classroom.find({specialities: specialityId, status: 'accepted', academic_year: academicYear}).lean();

        console.log('CLASSES: ', classes);
        let classIds = [];

        classes.forEach(cl => {
            classIds.push(cl._id);
        })


        let allData = await LiveSession.find({academic_year: academicYear, "classroom_id": {$in: classIds}}).populate('classroom_id');

        console.log('ALL LIVE SESSIONS: ', allData);

        return res.status(200).send({message: "All Live Sessions", data: allData})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}



exports.endLiveSession = async(req,res) => {
    try {
        // console.log("END SESSSION: ",req.body);

        let sessionId = req.body.id;
        let teacherId = req.userId;
       

        await LiveSession.update(
            {
                "_id": sessionId,
                teacher_id: teacherId
            },
            {
                $set: {status: "Ended"}
            }
        )

        return res.status(200).send({message: "Live Session Ended"})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// For students
// CHECK IF STUDENT IS MEMBER OF CLASS FOR ACADEMIC YEAR
exports.joinSession = async(req, res) => {
    try {
        let studId = req.userId;

        let sessionCode = req.body.meeting_code;
    
        let check = await LiveSession.findOne({meeting_code: sessionCode, status: 'Ended'});
        
        // CHECK IF SESSION STILL EXIST
        if(check) {
            return res.status(400).send({message: "Session already ended"});
        }

        // CHECK IF STUDENT IS CLASS MEMBER
        let sessionData = await LiveSession.findOne({meeting_code: sessionCode});

        if(!sessionData){
            // CODE DOES NOT EXIST
            return res.status(400).send({message: "Meeting does not exist"})
        }

        let check2 = await Application.findOne({student_id: studId, class_id: sessionData.classroom_id, status: 'accepted'});

        // CHECK IF STUDENT WAS ACCEPTED IN CLASS FOR ACADEMIC YEAR

        // if(!check2) {
        //     return res.status(400).send({message: "You are not a verified member of that class"})
        // }

        // Check if student has already been added as participant if not add if yes don't
        let check3 = await LiveSession.findOne({meeting_code: sessionCode, participants: studId}).lean();

        if(check3) {
            console.log('STUDENT ALREADY IN CLASS');
        }else {
            let session = await LiveSession.findOne({meeting_code: sessionCode});

            session.participants.push(studId);
            await session.save();
            console.log('Add student as new participant')
        }

        return res.status(200).send({message: "Joined Session"});

    } catch (error) {
        return res.status(500).send({message: error});
    }

}   


