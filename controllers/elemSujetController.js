const ElemSujet = require('../models/elemSujet');

exports.addElem = async(req, res) => {
    try {
        let data = {
            TypeElement: req.body.TypeElement,
            NumeroSujet: req.body.NumeroSujet,
            titre: req.body.titre,
            contenu: req.body.contenu, 
            document1:req.body.document1,
            document2: req.body.document2  
        }

        const elem = new ElemSujet(data);
        elem.save()
        return res.status(200).send({message: "creation réussi"});

} catch (error) {
    return res.status(500).send({message: "probleme lors de la creation"});

    }
}


exports.getSujetExpressionEcrite = async(req, res) =>{
    try {
        const expressionEcriteSujet1 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet1'}).populate();
        const expressionEcriteSujet2 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet2'}).populate();
        const expressionEcriteSujet3 = await ElemSujet.find( {TypeElement: "expression ecrite", NumeroSujet: 'sujet3'}).populate();

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
    try {
        const expressionOraleSujet1 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet1'}).populate();
        const expressionOraleSujet2 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet2'}).populate();
        const expressionOraleSujet3 = await ElemSujet.find( {TypeElement: "expression orale", NumeroSujet: 'sujet3'}).populate();

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