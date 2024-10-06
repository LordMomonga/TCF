const Audio = require('../models/Audio');

exports.addAudio = async(req, res) => {
    const user_id = req.params.id;
    try {
        
        let data = {
            utilisateur_id:user_id,
            audioUrl1: req.body.audioUrl1,
            audioUrl2: req.body.audioUrl2,
            audioUrl3: req.body.audioUrl3,
            contenu1_id:req.body.contenu1_id,
            contenu2_id:req.body.contenu2_id,
            contenu3_id:req.body.contenu3_id
        } 
        
         const audio = new Audio(data);
         await  audio.save()
        return res.status(200).send({message: "creation réussi"});

        
    } catch (error) {
        return res.status(500).send({message: "probleme lors de la creation"});

    }
}
exports.getAudio = async(req, res) => {
    try {
        let allData = await Audio.find()
        return res.status(200).send({message: "All Audio present", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});

    }
}