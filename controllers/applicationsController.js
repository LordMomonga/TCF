const Applications = require("../models/Applications");
const Classroom = require('../models/Classroom');


exports.getAllApplications = async(req,res) => {
    try {
        let allApplications = await Applications.find({teacher_id: req.userId}).populate('student_id').populate('class_id');

        return res.status(200).send({message: "All Applications", data: allApplications})
    } catch (error) {
        return res.status(500).send({message: "Error submitting application"})
    }
}

exports.getStudentApplications = async(req,res) => {
    try {
        let id = req.userId;

        let data = await Applications.find({student_id: id}).populate('class_id').populate('teacher_id');

        return res.status(200).send({message: "Students Applications", data: data});

    } catch (error) {
         return res.status(500).send({message: "Error getting student applications"})
    }
}


exports.newApplication = async (req,res) => {
    try {

        let teacherData = await Classroom.findOne({_id: req.body.class_id});
    
        if(!teacherData) {
            return res.status(400).send({message: "Classroom does not exist!"})
        }

        let data = {
            ...req.body,
            student_id: req.userId,
            teacher_id: teacherData.teacher_id
        }

        console.log("APPLICATION", data);

        let application = new Applications(data);

        await application.save();

        return res.status(200).send({message: "Application Submmited Successfuly"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Error submitting application"})
    }
}

exports.approveApplication = async (req,res) => {
    try {
        let applicationId = req.body.id;
        let status = req.body.status;

        await Applications.update(
            {
                "_id": applicationId
            },
            {
                $set: {status, status}
            }
        )

        return res.status(200).send({message: "Application Approved"})
    } catch (error) {
        return res.status(500).send({message: "Error updating application"})
    }
}


exports.rejectApplications = async(req,res) => {
    try {
        let applicationId = req.body.id;
        let status = req.body.status;

        await Applications.update(
            {
                "_id": applicationId
            },
            {
                $set: {status, status}
            }
        )

        return res.status(200).send({message: "Application Rejected"});

    } catch (error) {
        return res.status(500).send({message: "Error rejecting application"})
    }
}

