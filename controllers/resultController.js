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
        let testType = req.params.id

        let data = await Resultat.find({utilisateur_id: userId, typeTest:testType});


        // Organiser les données pour le frontend
        const groupedData = data.reduce((acc, item) => {
            const key = `${item.typeTest}-${item.niveau}`;
            if (!acc[key]) {
                acc[key] = {
                    typeTest: item.typeTest,
                    niveau: item.niveau,
                    count: 0,
                    totalScore: 0,
                };
            }
            acc[key].count++;
            acc[key].totalScore += parseFloat(item.score);
            return acc;
        }, {});

        const formattedData = Object.values(groupedData).map((item) => ({
            typeTest: item.typeTest,
            niveau: item.niveau,
            avgScore: item.totalScore / item.count,
            count: item.count,
        }));
        console.log(formattedData);
       console.log("affiche  le bie,",testType);

        return res.status(200).send({
            message: 'Récupération réussie',
            data: formattedData,
        });
    }catch(error) {
        return res.status(500).send({message: "Error lors de la recuperation "})

    }
}
 
