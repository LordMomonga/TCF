const Audio = require('../models/Audio');

exports.addAudio = async(req, res) => {
    const user_id = req.params.id;
    try {
        console.log('Received data:',req.userId); 

        let data = {
            utilisateur_id:req.userId,
            audioUrl1: req.body.audioUrl,
            audioUrl2: req.body.audioUrl1,
            audioUrl3: req.body.audioUrl2,
            contenu1_id:req.body.contenu1_id,
            contenu2_id:req.body.contenu2_id,
            contenu3_id:req.body.contenu3_id
        } 
        console.log(data);
        
         let audio = new Audio(data);
         await audio.save();

        return res.status(200).send({message: "creation réussi"});

        
    } catch (error) {
        return res.status(500).send({message: "probleme lors de la creation"});

    }
}
exports.getAudio = async(req, res) => {
    try {
        let allData = await Audio.find().populate('utilisateur_id').populate('contenu1_id').populate('contenu2_id').populate('contenu3_id');
        
        
        return res.status(200).send({message: "All Audio present", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});

    }
}
exports.getOneAudio = async(req, res) => {
    try {
        let audioId = req.body.elementID;
        let elementID = req.query.elementID; 
        console.log(req.params.id);    

    let data = await Audio.findOne({_id: req.params.id}).populate('utilisateur_id').populate('contenu1_id').populate('contenu2_id').populate('contenu3_id');

  
    
    return res.status(200).send({message: " Applications", data: data});

    } catch (error) {
        return res.status(500).send({message: "Error getting student applications"})

    }
    

}