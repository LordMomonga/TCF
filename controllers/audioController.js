const Audio = require('../models/Audio');

exports.addAudio = async(req, res) => {
    try {
        let data = {
            nomAudio: req.body.nomAudio,
            audioUrl: req.body.audioUrl
        }
        
        const audio = new Audio(data);
        audio.save()
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