const Element = require('../models/elementTest');
exports.addElement = async(req, res) => {
    try {

        
        
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
}       

const elem = new Element(data)
elem.save((err) => {
    if (err) {
      console.error('Error saving document:', err);
    } else {
      console.log('Document saved successfully');
    }
  });

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
    try {
        const listeningC1 = Element.find({typeElement: "comprehension ecrite", level: "C1"}).populate()
        const listeningC2 = Element.find({typeElement: "comprehension ecrite", level: "C2"}).populate()
        const listeningB1 = Element.find({typeElement: "comprehension ecrite", level: "B1"}).populate()
        const listeningB2 = Element.find({typeElement: "comprehension ecrite", level: "B2"}).populate()
        const listeningA1 = Element.find({typeElement: "comprehension ecrite", level: "A1"}).populate()
        const listeningA2 = Element.find({typeElement: "comprehension ecrite", level: "A2"}).populate()

        const shuffledlisteningC2 = listeningC2.sort(() => 0.5 - Math.random());
        const shuffledlisteningC1 = listeningC1.sort(() => 0.5 - Math.random());
        const shuffledlisteningB1 = listeningB1.sort(() => 0.5 - Math.random());
        const shuffledlisteningB2 = listeningB2.sort(() => 0.5 - Math.random());
        const shuffledlisteningA2 = listeningA2.sort(() => 0.5 - Math.random());
        const shuffledlisteningA1 = listeningA1.sort(() => 0.5 - Math.random());

        const selectListeningA1 = shuffledlisteningA1.slice(0, 4)
        const selectListeningA2 = shuffledlisteningA2.slice(0, 4)
        const selectListeningB1 = shuffledlisteningB1.slice(0, 4)
        const selectListeningB2 = shuffledlisteningB2.slice(0, 4)
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
exports.getComprehensionOrale = async(req, res) =>{
    try {
        
        const speakingC1 = Element.find({typeElement: "comprehension orale", level: "C1"}).populate()
        const speakingC2 = Element.find({typeElement: "comprehension orale", level: "C2"}).populate()
        const speakingB1 = Element.find({typeElement: "comprehension orale", level: "B1"}).populate()
        const speakingB2 = Element.find({typeElement: "comprehension orale", level: "B2"}).populate()
        const speakingA1 = Element.find({typeElement: "comprehension orale", level: "A1"}).populate()
        const speakingA2 = Element.find({typeElement: "comprehension orale", level: "A2"}).populate()

        const shuffledspeakingC2 = speakingC2.sort(() => 0.5 - Math.random());
        const shuffledspeakingC1 = speakingC1.sort(() => 0.5 - Math.random());
        const shuffledspeakingB1 = speakingB1.sort(() => 0.5 - Math.random());
        const shuffledspeakingB2 = speakingB2.sort(() => 0.5 - Math.random());
        const shuffledspeakingA2 = speakingA2.sort(() => 0.5 - Math.random());
        const shuffledspeakingA1 = speakingA1.sort(() => 0.5 - Math.random());

        const selectListeningA1 = shuffledspeakingA1.slice(0, 5)
        const selectListeningA2 = shuffledspeakingA2.slice(0, 10)
        const selectListeningB1 = shuffledspeakingB1.slice(0, 5)
        const selectListeningB2 = shuffledspeakingB2.slice(0, 5)
        const selectListeningC1 = shuffledspeakingC1.slice(0, 8)
        const selectListeningC2 = shuffledspeakingC2.slice(0, 6)

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
        return res.status(500).send({message: "error"});

    }
}