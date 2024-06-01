const FeesReceipt = require('../models/FeesReceipt');
const Report = require('../models/Report');
const StudentInfo = require('../models/StudentInfo');

exports.submitReceipt = async(req,res) => {
    try {
        console.log('CREATE RECEIPTS', req.body);

        let studentId = req.userId;
        let accademicYear = req.params.academic_year_id;



        if(req.body.file_url.length < 2){
            return res.status(400).send({message: "You need to select a recipt confirmation file"})
        }

        // CHECK IF STUDENT IS PART OF SCHOOL FOR ACADEMIC YEAR

        let check1 = await StudentInfo.findOne({ academic_year: accademicYear});

        if(!check1) {
            console.log('Failed check one')
            return res.status(400).send({message: "You are not a member of this years"});
        }

        // CHECK IF STUDENT OWE FEES

        if(check1.fees_paid == check1.total_fees) {
            return res.status(400).send({message: "You already paid all your fees"});
        }


        let data = {
            ...req.body,
            speciality: check1.speciality_id,
            student_id: studentId,
            academic_year: accademicYear
        };

        let receipt = new FeesReceipt(data);

        await receipt.save();

        return res.status(200).send({message: "Receipt Created"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
}

exports.studentGetReceipts= async(req,res) => {
    try {

        console.log('STUDENT GET RECEIPTS')
        let studentId = req.userId;
        let accademicYear = req.params.academic_year_id;

        let allReceipts = await FeesReceipt.find({student_id: studentId, academic_year: accademicYear}).populate('school_id').populate('speciality').populate('BankInfo');

        return res.status(200).send({message: "All student receipts", data: allReceipts});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.schoolGetReceipts = async(req,res) => {
    try {
        let accademicYear = req.params.academic_year_id;

        let allReceipts = await FeesReceipt.find({ academic_year: accademicYear}).populate('student_id').populate('speciality').populate('account');

        console.log('ALL RECEIIPTS', allReceipts);

        return res.status(200).send({message: "All students receipts", data: allReceipts});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.schoolAcceptReceipt = async(req,res) => {
    try {
        let schoolId = req.userId;
        let accademicYear = req.params.academic_year_id;
        let receiptId = req.params.id;

        let receipt = await FeesReceipt.findOne({_id: receiptId});

        if(!receipt) {
            return res.status(400).send({message: "Receipt Not Found"});
        }


        let student = await StudentInfo.findOne({student_id: receipt.student_id, academic_year: accademicYear});
        

        await FeesReceipt.findOneAndUpdate({ academic_year: accademicYear, _id: receiptId},{status: 'verified'});

        
        let oldAmt = parseInt(student.fees_paid);
        let addition = parseInt(receipt.amount);

        student.fees_paid = `${oldAmt + addition}`;

        await student.save();


        return res.status(200).send({message: 'Receipt Verified'})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.schoolRejectsReceipt = async(req,res) => {
    try {

        let schoolId = req.userId;
        let accademicYear = req.params.academic_year_id;
        let receiptId = req.params.id;

        await FeesReceipt.findOneAndUpdate({school_id: schoolId, academic_year: accademicYear, _id: receiptId},{status: 'rejected'});

        return res.status(200).send({message: 'Receipt Rejected'})
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.deleteReceipt =  async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}