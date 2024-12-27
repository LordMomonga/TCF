const Audio = require('../models/Audio');



exports.addAudio = async(req, res) => {
    const user_id = req.params.id;
    const Notification = require('../models/Notification')

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

         

        // Créer une notification pour l'utilisateur
        const notification = new Notification({
           utilisateur_id: req.userId,  // Assurez-vous d'envoyer l'ID de l'utilisateur qui doit recevoir la notification
           typeNotification: 'Correction disponible',
           typeUser:"user",
           vue: false // La notification est par défaut non vue

       });
       await notification.save(); 

       
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

    let data = await Audio.findOne({_id: req.params.id}).populate('utilisateur_id').populate('contenu1_id').populate('contenu2_id').populate('contenu3_id');

  
     
    return res.status(200).send({message: " Applications", data: data});

    } catch (error) {
        return res.status(500).send({message: "Error getting student applications"})

    }
    

}
exports.updateAudio = async (req,res) => {
  
    
    try {
        // console.log('UPDATE REQ', req.body);
        const commentaire = req.body.commentaire
    const Audio_id = req.body._idAudio
    const note = req.body.note
    const pend = req.body.status
    console.log(Audio_id);
    console.log(commentaire, note);
      
        await Audio.updateOne(
            {"_id": Audio_id}, 
            
            { 
                $set: { 
                    commentaire: commentaire,
                    note: note,
                    stat: pend 
                }
             }
    );
        console.log("comme tu vois");
        
        return res.status(200).send({message: "Audio Updated"});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.selAudioStudent = async (req, res) => {

    try {
        let studentId = req.userId;
        console.log("bien ou bien");
        
        let data = await Audio.find({utilisateur_id: studentId}).populate('contenu1_id').populate('contenu2_id').populate('contenu3_id'); 
       
        return res.status(200).send({message: " Applications", data: data});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.markAsReadaUDIO= async (req, res) => {
    try {
        const solutionId = req.params.id;

        const solution = await Audio.findByIdAndUpdate(solutionId, { vue: true }, { new: true });

        if (!solution) {
            return res.status(404).send({ message: 'Notification non trouvée' });
        }

        return res.status(200).json(solution);
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};