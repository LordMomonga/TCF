const Resultat = require('../models/ResultElement')
const specialitie = require('../models/Speciality')
const StudentInfo = require("../models/StudentInfo")

exports.createResult = async(req, res) => {
    try {
        schoolId = req.userId;
      
        id = req.body.genreTest
        let genreName
        if(id){
            const specName = await specialitie.find({_id: id})
             genreName = specName[0].name
        }

        let data = {
            utilisateur_id: req.userId,
            typeTest:req.body.typeTest,
            genreTest:genreName,
            niveau:req.body.niveau,
            score:req.body.score,
            
        }
       
        let resultElement = new Resultat(data)
        console.log(resultElement);
       
        await resultElement.save()
        return res.status(200).send({message:'Test Enregistré'})
        
    } catch (error) {
        return res.status(500).send({message: error});

    }
}

exports.getResultElement = async(req, res) => {
    try {   
        userId = req.userId;

        let data = await Resultat.find({utilisateur_id: userId});

        return res.status(200).send({message:'recuperation reussie', data: data})

    }catch(error) {
        return res.status(500).send({message: "Error lors de la recuperation "})

    }
}
 
