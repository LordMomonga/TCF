const Speciality = require("../models/Speciality");
const User = require("../models/User");



exports.getSchoolsPublic = async(req, res) => {
    try {
        let alLSchools = await User.find({});
        let schoolsData = [];

        alLSchools.map(data => {
            let newData = {};

            if(data.account_type == 'school') {
                newData.name = data.username;
                newData._id = data._id;
                newData.school_code = data.school_code;

                schoolsData.push(newData);
            }

        })

        console.log('SCHOOL: ', schoolsData);

        return res.status(200).send({message: "All School", data: schoolsData});

    } catch (error) {
        return res.status(500).send({message: error});
        console.log("erreur")
    }
}

exports.getSpecialitiesPublic = async(req,res) => {
    try {


        let speciality = await Speciality.find();

        console.log('SPECIALITIES: ', speciality);

        return res.status(200).send({message: "All Specialites", data: speciality})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

