const BankInfo = require('../models/BankInfo');
const StudentInfo = require('../models/StudentInfo');

exports.createBankInfo = async(req,res) => {
    try {
        let schoolId = req.userId;

        let data = {
            ...req.body,
            school_id: schoolId
        };

        let bankInfo = new BankInfo(data);

        await bankInfo.save();

        return res.status(200).send({message: "BankInfo Created"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getBankInfos = async(req,res) => {
    try {
        let schoolId = req.userId;

        let allData = await BankInfo.find({school_id: schoolId});

        return res.status(200).send({message: "All Bank Infos", data: allData});
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.studentGetBankInfos = async(req,res) => {
    try {
        let studentId = req.userId;
        let academicYear = req.params.academic_year_id;

        let student = await StudentInfo.findOne({student_id: studentId, academic_year: academicYear})

        if(!student) {
            return res.status(400).send({message: "Not part of any school"});
        }

        let allData = await BankInfo.find({school_id: student.school_id});

        return res.status(200).send({message: "School Bank Infos", data: allData});
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.updateBankInfo = async (req,res) => {
    try {
        let id = req.params.id;
        let schoolId = req.userId;

        await BankInfo.findOneAndUpdate({_id: id, school_id: schoolId}, {...req.body});

        return res.status(200).send({message: "Bank Info Updated"});

    } catch (error) {
        return res.status(500).send({message: error});
    }
} 


exports.deleteBankInfo = async(req,res) => {
    try {
        let id = req.params.id;
        let schoolId = req.userId;
        
        await BankInfo.findOneAndDelete({_id: id,  school_id: schoolId});

        return res.status(200).send({message: "Bank Info Deleted"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

