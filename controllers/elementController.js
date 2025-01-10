const Element = require('../models/elementTest');
const StudentInfo = require("../models/StudentInfo")
const Notification = require('../models/Notification')

const mongoose = require('mongoose');

exports.addElement = async(req, res) => {
    try {

        console.log('Received data:', req.body);
        
let data = {
    level: req.body.level,
    question: req.body.question,
    solution1: req.body.solution1,
    solution2: req.body.solution2,
    solution3: req.body.solution3,
    solution4: req.body.solution4,
    response: req.body.response,
    typeElement: req.body.typeElement,
    imageUrl: req.body.imageUrl,
    audioUrl: req.body.audioUrl,
    specialitie: req.body.specialitie,
    options: req.body.options // On ajoute les options ici

}       

 // Validation des options
 if (data.options && Array.isArray(data.options)) {
    data.options = data.options.map(option => ({
        question: option.question || null,
        answer1: option.answer1 || null,
        answer2: option.answer2 || null,
        answer3: option.answer3 || null,
        answer4: option.answer4 || null,
        solution: option.solution || null
    }));
}
  // creation de l'élément 
    let elem = new Element(data)
    await elem.save();

return res.status(200).send({message: "Creation reussi"});

    } catch (error) {
        return res.status(500).send({message: error});

    }
}

exports.getElement = async(req, res) =>{
    try {
        let allData = await Element.find() 
        return res.status(200).send({message: "All assignments", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});

    }
}
exports.getComprehensionEcrite = async(req, res) =>{

    let special = req.params.id;

    

    try {
        
        const listeningC1 = await Element.find({typeElement: "comprehension ecrite", level: "C1", specialitie: special}).populate()
        const listeningC2 = await Element.find({typeElement: "comprehension ecrite", level: "C2", specialitie: special}).populate()
        const listeningB1 = await Element.find({typeElement: "comprehension ecrite", level: "B1", specialitie: special}).populate()
        const listeningB2 = await Element.find({typeElement: "comprehension ecrite", level: "B2", specialitie: special}).populate()
        const listeningA1 = await Element.find({typeElement: "comprehension ecrite", level: "A1", specialitie: special}).populate()
        const listeningA2 = await Element.find({typeElement: "comprehension ecrite", level: "A2", specialitie: special}).populate()
        
        const shuffledlisteningC2 = listeningC2.sort(() => 0.5 - Math.random());
        const shuffledlisteningC1 = listeningC1.sort(() => 0.5 - Math.random());
        const shuffledlisteningB1 = listeningB1.sort(() => 0.5 - Math.random());
        const shuffledlisteningB2 = listeningB2.sort(() => 0.5 - Math.random());
        const shuffledlisteningA2 = listeningA2.sort(() => 0.5 - Math.random());
        const shuffledlisteningA1 = listeningA1.sort(() => 0.5 - Math.random());

        const selectListeningA1 = shuffledlisteningA1.slice(0, 9)
        const selectListeningA2 = shuffledlisteningA2.slice(0, 8)
        const selectListeningB1 = shuffledlisteningB1.slice(0, 8)
        const selectListeningB2 = shuffledlisteningB2.slice(0, 6)
        const selectListeningC1 = shuffledlisteningC1.slice(0, 4)
        const selectListeningC2 = shuffledlisteningC2.slice(0, 4)

        const allData = {
            selectListeningA1,
            selectListeningA2,
            selectListeningB1,
            selectListeningB2,
            selectListeningC1,
            selectListeningC2
        }
        
        return res.status(200).send({message: "statut find", data: allData });


    } catch (error) {
        return res.status(500).send({message: error});

    }
}

const updateSpecialities = async () => {
    try {
     
  
      // ObjectID par défaut à attribuer
      const defaultSpecialityId = mongoose.Types.ObjectId("6655e8211fac5930b813dfa9");
  
      // Mettre à jour tous les documents sans specialities
      const result = await Element.updateMany(
        { specialitie: null }, // Condition : documents sans specialities
        { $set: { specialitie: defaultSpecialityId } } // Mettre à jour avec la valeur par défaut
      );
  
      console.log(`${result.modifiedCount} documents ont été mis à jour.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } 
  };
  
exports.getComprehensionOrale = async(req, res) =>{
    let special = req.params.id;
    
 

    try {
        
        const speakingC1Promise = await Element.find({ typeElement: "comprehension orale", level: "C1",  specialitie: special });
        const speakingC2Promise = await Element.find({ typeElement: "comprehension orale", level: "C2", specialitie: special });
        const speakingB1Promise = await Element.find({ typeElement: "comprehension orale", level: "B1", specialitie: special });
        const speakingB2Promise = await Element.find({ typeElement: "comprehension orale", level: "B2", specialitie: special });
        const speakingA1Promise = await Element.find({ typeElement: "comprehension orale", level: "A1", specialitie: special });
        const speakingA2Promise = await Element.find({ typeElement: "comprehension orale", level: "A2", specialitie: special });

        const [
            speakingC1,
            speakingC2,
            speakingB1,
            speakingB2,
            speakingA1,
            speakingA2
        ] = await Promise.all([speakingC1Promise, speakingC2Promise, speakingB1Promise, speakingB2Promise, speakingA1Promise, speakingA2Promise]);

        const shuffledspeakingC2 = speakingC2.sort(() => 0.5 - Math.random());
        const shuffledspeakingC1 = speakingC1.sort(() => 0.5 - Math.random());
        const shuffledspeakingB1 = speakingB1.sort(() => 0.5 - Math.random());
        const shuffledspeakingB2 = speakingB2.sort(() => 0.5 - Math.random());
        const shuffledspeakingA2 = speakingA2.sort(() => 0.5 - Math.random());
        const shuffledspeakingA1 = speakingA1.sort(() => 0.5 - Math.random());

        const selectListeningA1 = shuffledspeakingA1.slice(0, 8);
        const selectListeningA2 = shuffledspeakingA2.slice(0, 9);
        const selectListeningB1 = shuffledspeakingB1.slice(0, 8);
        const selectListeningB2 = shuffledspeakingB2.slice(0, 5);
        const selectListeningC1 = shuffledspeakingC1.slice(0, 5);
        const selectListeningC2 = shuffledspeakingC2.slice(0, 4);

        const allData = {
            selectListeningA1,
            selectListeningA2,
            selectListeningB1,
            selectListeningB2,
            selectListeningC1,
            selectListeningC2
        };

        return res.status(200).send({ message: "statut find", data: allData });
    } catch (error) {
        return res.status(500).send({message: "error"})

    }
}