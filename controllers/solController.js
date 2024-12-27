const sol = require('../models/Sol');
const Notification = require('../models/Notification')

exports.createSolution = async(req, res) => {
    const user_id = req.params.id;

    try {
        let data = {
            utilisateur_id: user_id,
            Audio_id: req.body.Audio_id,
            text_id: req.body.text_id,
            listening_id: req.body.listening_id,
            reading_id: req.body.reading_id,
            correctionAudio: req.body.correctionAudio,
            correctionEcrit: req.body.correctionEcrit
        }

        let solution = new sol(data);

        await solution.save()

          // Créer une notification pour l'utilisateur
          const notification = new Notification({
            utilisateur_id: req.userId,  // Assurez-vous d'envoyer l'ID de l'utilisateur qui doit recevoir la notification
            typeNotification: 'Correction canditat compos',
            typeUser:"admin",
            vue: false // La notification est par défaut non vue
 
        });
        await notification.save(); 
        console.log('a la recherche', notification, solution);

        return res.status(200).send({message:'enregistrement reussi', data: ecriture_id})

    } catch (error) {
        return res.status(500).send({message: error});

    }

}

exports.getSolution = async(req, res) => {
    try {   
        let data = await sol.find();

        return res.status(200).send({message:'recuperation reussie', data: data})

    }catch(error) {
        return res.status(500).send({message: "Error lors de la recuperation "})

    }
}
exports.getOneSolution = async(req, res) => {
    let  solId = req.body.id     

    try {
  let data = new sol.findOne({_id: req.body.sol_id}).populate('Audio_id').populate('text_id').populate('listening_id').populate('reading_id').populate('utilisateur_id')
  return res.status(200).send({message:'recuperation reussie', data: data})

    } catch (error) {
        return res.status(500).send({message: "Error lors de la recuperation "})

    }
}