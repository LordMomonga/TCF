const StudentInfo = require('../models/StudentInfo');
const Speciality = require('../models/Speciality');
const User = require('../models/User');
const AcademicYear = require('../models/AcademicYear');

exports.submitApplication =  async (req,res) => {
    try {
        console.log('SUBMIT APPLICATION', req.body);

        let studentId = req.userId;
        let specialityCode = req.body.speciality_code;
        // let academicYear = req.params.academic_year_id;

       /* let schoolCheck = await User.findOne({account_type: 'school', school_code: schooolCode})
        
        if(!schoolCheck) {
            return res.status(400).send({message: "Enter A Valid Schoool Code"})
        }*/

        
        let speciality = await Speciality.findOne({code: specialityCode});

        console.log('SPECIALITY: ', speciality)

        if(!speciality) {
            return res.status(400).send({message: "entrer un code de spécialité valide"})
        }


        // Check if school has ongoing academic year
        let academicCheck = await AcademicYear.findOne({ status: 'ongoing'});

        if(!academicCheck) {
            return res.status(400).send({message: "on a aucun année d'apprentissage valide"})
        }

        // CHECK IF STUDENT ALREADY APPLIED FOR SCHOOL
       /* let finalCheck = await StudentInfo.findOne({student_id: studentId, academic_year:  academicCheck._id})

        if(finalCheck) {
            return res.status(400).send({message: "You already applid to school"});
        }*/
        
        let data = {
            student_id: studentId,
            academic_year: academicCheck._id,
            status: 'pending',
            fees_paid: 0,
            total_fees: speciality.fees,
            speciality_id: speciality._id
        }

        let studentApplication = new StudentInfo(data);

        await studentApplication.save();

        return res.status(200).send({message: 'canditature recue'})

        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

// GET STUDENTS APPLICATIONS TO JOIN SCHOOL
exports.studentGetApplications = async (req, res) => {
    try {
        let userId = req.userId;
        // let academicYear = req.params.academic_year_id;


        let allData = await StudentInfo.find({student_id: userId}).populate('academic_year').populate('speciality_id'); 

        return res.status(200).send({message: "All applications", data: allData});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}



exports.getSchoolStudents = async (req,res) => {
    try {
        console.log('GET STUDENTS')
        let academicYear = req.params.academic_year_id;

        console.log('ACADEMIC YEAR: ', academicYear); 
        console.log('school id: ')
        
        let allStudents = await StudentInfo.find({academic_year: academicYear}).populate('student_id').populate('academic_year').populate('speciality_id');


        console.log('ALL STUDENTS: ', allStudents)
        return res.status(200).send({message: "All application", data: allStudents});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getSchoolAcceptedStudents = async(req,res) => {
    try {
        // console.log('GET ACCEPTED')
        let academicYear = req.params.academic_year_id;

        console.log('SCHOOL ID: ');
        console.log('ACADEMIC YEAR: ', academicYear);

        let allStudents = await StudentInfo.find({academic_year: academicYear, $or: [{ status: 'accepted'},{status: 'suspended'}]}).populate('student_id').populate('academic_year').populate('speciality_id');

        let finalData = [];

        
        return res.status(200).send({message: "All Accepted Students", data: allStudents});

    } catch (error) {
        return res.status(500).send({message: error});
    }
} 

exports.acceptStudentsApplication = async(req,res) => {
    try {
        let applicationId = req.params.id;
       
        let academicYear = req.params.academic_year_id;

        // console.log(req.body);
        // return res.status(200).send({message: "Student Accepted OK"})

         await StudentInfo.findOneAndUpdate({_id: applicationId, academic_year: academicYear}, {status: 'accepted'});


        return res.status(200).send({message: "Student Accepted"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}


exports.rejectStudentApplication = async(req,res) => {
    try {
        let applicationId = req.params.id;
       
        let academicYear = req.params.academic_year_id;


        await StudentInfo.findOneAndUpdate({_id: applicationId, academic_year: academicYear}, {status: 'rejected'});

        return res.status(200).send({message: "application Rejeté"})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.suspendStudent = async(req,res) => {
    try {
        let applicationId = req.params.id;
       
        let academicYear = req.params.academic_year_id;


        await StudentInfo.findOneAndUpdate({_id: applicationId,  academic_year: academicYear}, {status: 'suspended'});

        return res.status(200).send({message: "Student Suspended"})

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

