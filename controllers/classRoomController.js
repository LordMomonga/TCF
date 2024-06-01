const Classroom = require('../models/Classroom');
const User = require('../models/User');
const Speciality = require('../models/Speciality');
const StudentInfo = require('../models/StudentInfo');
const AcademicYear = require('../models/AcademicYear');

exports.createClassRoom = async (req, res) => {
    try {
        // console.log('CREATE CLASS', req.body);

        let data = {
            name: req.body.name,
            teacher_id: req.userId,
        }

        

         // CHECK IF SCHOOL CODE WAS SET
        if(req.body.school_code.length > 2) {
            let school = await User.findOne({school_code: req.body.school_code});
            let schoolId = school._id;
            
            let specialitesData = req.body.specialities.map(sp => sp.trim());

            let specialities = await Speciality.find({"code": { $in: specialitesData }}).populate('school_id');
            // console.log('SCHOOL_ID', school.school_code);
            

            if(specialities.length <= 0) {
                return res.status(400).send({message: "Please Enter A Valid Speciality  Code"});
            }


            let belongsToSchool = true;
            let specialityIds = [];

            specialities.forEach(speciality => {
                if(speciality.school_id.school_code != school.school_code) {
                    // console.log('SCHOOL SPECIAL: ', speciality.school_id.school_code)
                    belongsToSchool = false;
                }
                specialityIds.push(speciality._id);
            })

            if(!belongsToSchool) {
                return res.status(500).send({message: "All Specialities Must Belong TO Same Institution"});
            }

            // CHECK IF SCHOOL HAS AN ONGOING ACADEMIC YEAR
            let academicCheck = await AcademicYear.findOne({school_id: schoolId, status: 'ongoing'});

            if(!academicCheck) {
                return res.status(400).send({message: "School has no ongoing academic year"})
            }

            data.specialities = specialityIds;
            data.school_id = schoolId;
            data.class_type = 'school';
            data.status = 'pending'
            data.academic_year = academicCheck._id;


        }else {
            // REMOVE IF YOU WANT TEACHERS TO CREATE PRIVATE CLASSESS
            return res.status(400).send({message: "Please enter schoool code"})
        }

        
        // console.log('GOT TO THE END ALL GOOD: ', data);

        // return res.status(200).send({message: "Classroom Created"});

        let classRoom = new Classroom(data);

        await classRoom.save();

        return res.status(200).send({message: "Classroom Created"});

    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}


exports.getClasses = async(req,res) => {
    try {
        console.log('GET CLASSES');
        let academicYear = req.params.academic_year_id;


        let classes = await Classroom.find({teacher_id: req.userId, academic_year: academicYear, status: 'accepted'}).populate('specialities').populate('school_id');

      
        return res.status(200).send({message: "All Classsrooms", data: classes});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getPendingClassRequests = async(req,res) => {
    try {
        console.log('GET CLASS REQUEST');
        
        let allData = [];


        let classes = await Classroom.find({teacher_id: req.userId}).populate('specialities').populate('school_id');

        console.log(classes);
        classes.forEach(cl => {
            if(cl.status != 'accepted') {
                allData.push(cl);
            }
        })

        return res.status(200).send({message: "All Classsrooms", data: classes});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}



// ACCEPTED CLASSES FOR STUDENT SPECIALITY AT A GIVEN ACADEMIC YEAR
exports.getStudentAcceptedClasses = async(req,res) => {
    try {
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        console.log('GET ACCEPTED CLASSES ', req.params)
        let studentInfo = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear, status: 'accepted'});

        console.log('ACADEMIC YEAR');
        console.log(academicYear)
        
        if(!studentInfo) {
            return res.status(400).send({message: "You where not a member of any class that year"})
        }

        let specialityId = studentInfo.speciality_id;

        let classes = await Classroom.find({specialities: specialityId, status: 'accepted', academic_year: academicYear}).lean();

        console.log(classes);
        return res.status(200).send({message: "Accepted Classes", data: classes});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// GET TEACHER ACCEPTED SCHOOLS
exports.getTeachersAcceptedSchools = async(req,res) => {
    try {
        let academicYear = req.params.academic_year_id;
        let teacherId = req.userId;

        let teacherSchools = [];
        let existingSchoolsIds = [];

        // get all teachers accepted request poppulate schools for academic year
        let allSchools = await Classroom.find({teacher_id: teacherId, academic_year: academicYear}).populate('school_id');

        // get unique schools and keep in array
        allSchools.forEach(sc => {
            if(existingSchoolsIds.indexOf(sc.school_id._id) <= 0) {
                existingSchoolsIds.push(sc.school_id._id);
                sc.password = '';
                teacherSchools.push(sc.school_id);
            }
        })

        // return uniques schools
        // console.log('UNIQUE SCCHOOLS');
        // console.log(teacherSchools);

        return res.status(200).send({message: "All Schools", data: teacherSchools})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getTeachersClassRequest = async(req,res) => {
    try {
        // console.log('FIND TEACHERS REQUEST', req.params);

        let schoolId = req.userId;
        let academicYear = req.params.academic_year_id;

        let allReq = await Classroom.find({school_id: schoolId, academic_year: academicYear}).populate('teacher_id').populate('specialities');

        // console.log('FIND TEACHERS REQUEST', allReq);
        
        return res.status(200).send({message: "All Request", data: allReq});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.acceptTeachersRequest = async(req,res) => {
    try {
        console.log('ACCEPT REQUEST', req.body)
        let schoolId = req.userId;
        let classId = req.params.id;

        await Classroom.findOneAndUpdate({_id: classId, school_id: schoolId}, req.body);

        return res.status(200).send({message: "Request accepted"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}

exports.rejecteachersRequest = async(req,res) => {
    try {
        console.log('REJECT REQUEST', req.body)
        let schoolId = req.userId;
        let classId = req.params.id;

        await Classroom.findOneAndUpdate({_id: classId, school_id: schoolId}, req.body);

        return res.status(200).send({message: "Request rejected"});
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}

exports.deleteClass = async(req,res) => {
    try {
        console.log('DELETE CLASSROOM');

        let classId = req.params.classroomId;
        let academicYear = req.params.academic_year_id;

        await Classroom.remove({_id: classId, academic_year: academicYear});

        return res.status(200).send({message: "Classroom Delete"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}   

