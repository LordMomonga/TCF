const ElemSujet = require('../models/elemSujet');
const StudentInfo = require("../models/StudentInfo")
const mongoose = require('mongoose');

exports.addElem = async(req, res) => {
    try {
        let data = {
            TypeElement: req.body.TypeElement,
            NumeroSujet: req.body.NumeroSujet,
            titre: req.body.titre,
            contenu: req.body.contenu, 
            document1:req.body.document1,
            document2: req.body.document2,
            specialitie: req.body.specialitie,

        }

        const elem = new ElemSujet(data);
        elem.save()
        return res.status(200).send({message: "creation réussi"});

} catch (error) {
    return res.status(500).send({message: "probleme lors de la creation"});

    }
}

const updateSpecialities = async () => {
    try {
     
  
      // ObjectID par défaut à attribuer
      const defaultSpecialityId = mongoose.Types.ObjectId("6655e8211fac5930b813dfa9");
  
      // Mettre à jour tous les documents sans specialities
      const result = await ElemSujet.updateMany(
        { specialitie: null }, // Condition : documents sans specialities
        { $set: { specialitie: defaultSpecialityId } } // Mettre à jour avec la valeur par défaut
      );
  
      console.log(`${result.modifiedCount} documents ont été mis à jour.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } 
  };

exports.getSujetExpressionEcrite = async(req, res) =>{
    let special = req.params.id;

    const specName = await StudentInfo.find({student_id: req.userId}).populate("speciality_id")
    const spec = specName[0].speciality_id._id
    const specN = specName[0].speciality_id.name

    if(!spec) return
    else {
        if(!specN) {
            spec = "TCF"  
        }
    }

    try {
        const expressionEcriteSujet1 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet1', specialitie: special}).populate();
        const expressionEcriteSujet2 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet2', specialitie: special}).populate();
        const expressionEcriteSujet3 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet3', specialitie: special}).populate();

        const shuffledSubjects1 = expressionEcriteSujet1.sort(() => 0.5 - Math.random());
        const shuffledSubjects2 = expressionEcriteSujet2.sort(() => 0.5 - Math.random());
        const shuffledSubjects3 = expressionEcriteSujet3.sort(() => 0.5 - Math.random());

        const selectedSubjects1 = shuffledSubjects1.slice(0, 1);
        const selectedSubjects2 = shuffledSubjects2.slice(0, 1);
        const selectedSubjects3 = shuffledSubjects3.slice(0, 1);


const allData = {
    selectedSubjects1,
    selectedSubjects2,
    selectedSubjects3}

return res.status(200).send({message: "statut find", data: allData });
        
    } catch (error) {
        return res.status(500).send({message: "error"});

    }
}
exports.getSujetExpressionOrale = async(req, res) =>{
    let special = req.params.id;

    const specName = await StudentInfo.find({student_id: req.userId}).populate("speciality_id")
    const spec = specName[0].speciality_id._id
    const specN = specName[0].speciality_id.name

    if(!spec) return
    else {
        if(!specN) {
            spec = "TCF"  
        }
    }

    try {
        const expressionOraleSujet1 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet1', specialitie: special}).populate();
        const expressionOraleSujet2 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet2', specialitie: special}).populate();
        const expressionOraleSujet3 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet3', specialitie: special}).populate();

        const shuffledSubjects1 = expressionOraleSujet1.sort(() => 0.5 - Math.random());
        const shuffledSubjects2 = expressionOraleSujet2.sort(() => 0.5 - Math.random());
        const shuffledSubjects3 = expressionOraleSujet3.sort(() => 0.5 - Math.random());
        
        const selectedSubjects1 = shuffledSubjects1.slice(0, 1);
        const selectedSubjects2 = shuffledSubjects2.slice(0, 1);
        const selectedSubjects3 = shuffledSubjects3.slice(0, 1);

        const allData = {
            selectedSubjects1,
            selectedSubjects2,
            selectedSubjects3}
        
        return res.status(200).send({message: "statut find", data: allData });
        
    } catch (error) {
        return res.status(500).send({message: "error"});

    }
}