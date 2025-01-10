const Speciality = require('../models/Speciality');
const randomString = require('../utils/randomString');
const User =  require('../models/User');
const handleNotification = require('../midlewares/NotificationManager')
const StudentInfo = require('../models/StudentInfo');

exports.createSpeciality = async (req, res) => {
    try {
        console.log('CREATE SPECIALITY', req.body);
        let code = randomString.randomValueHex(6);

        let data = {
            name: req.body.name,
            code: code,
            fees: req.body.fees,
            descriptions:req.body.descriptions,
            students: []
        }

        let check = await Speciality.findOne({name: data.name});

        if(check) {
            return res.status(500).send({message: "spécialité déja existante"});
        }

        let schoolSpeciality = new Speciality(data);

        await schoolSpeciality.save();

        return res.status(200).send({message: "Speciality Created"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error});
    }
}

// SCHOOL SPECIALITY
exports.getSchoolSpecialities = async(req,res) => {
    try {
        console.log('GET SCHOOL SPECIALITY');

        let specialities = await Speciality.find();

        return res.status(200).send({message: "Toutes les tests", data: specialities});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.getAllSchools = async(req,res) => {
    try {

        let schools = await User.find({account_type: 'User'}).populate('class_id');

        return res.status(200).send({message: "All Specialities", data: application});

    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.moveItemFirst = async(req, res) => {
    const  id  = req.body.data
    let user = req.userId;
    try {
        const itemToMove = await StudentInfo.find({ _id: id})

        if(!itemToMove) {
            return res.status(404).send({message:"Element introuvable"})
        }

        await StudentInfo.updateMany(
            
                { _id: {$ne:id}, student_id:user},
                {$inc:{ position: 1}}
            
        )
        console.log("voila ein",  itemToMove  );
        
        await StudentInfo.updateOne(
            
            { _id: id},
            {$set:{ position: 0}}
        
    )
   
    return res.status(200).send({message:"Element déplacé avec un succces"})
        
    } catch (error) {
        return res.status(500).send({message: error});
    }
    
}


exports.deleteSpeciality = async(req,res) => {
    try {
        console.log('DELETE SPECIALITY');

        let specialityId = req.params.id;
            let verify = Speciality.find({_id: specialityId})
            if(!verify){
                return res.status(200).send({message: "specialite innexistant"});
            }
        await Speciality.remove({_id: specialityId});

        return res.status(200).send({message: "Test Supprimé"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}   

