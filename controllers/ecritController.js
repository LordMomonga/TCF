const Ecrit = require('../models/Ecirt');
const Notification = require('../models/Notification')
exports.addEcriture = async(req, res) =>{
    const user_id = req.params.id;
    let  academicYear = req.params.academicYear;

    try {
        let data = {
            utilisateur_id:req.userId,
            contenu1: req.body.contenu1,
            contenu2: req.body.contenu2,
            contenu3: req.body.contenu3,
            contenu1_id:req.body.contenu1_id,
            contenu2_id:req.body.contenu2_id,
            contenu3_id:req.body.contenu3_id
  
        }

        let eriture = new Ecrit(data);
        let ecriture_id = eriture._id;


         

        await eriture.save();

         // Créer une notification pour l'utilisateur
         const notification = new Notification({
            utilisateur_id: req.userId,  // Assurez-vous d'envoyer l'ID de l'utilisateur qui doit recevoir la notification
            typeNotification: 'correction Disponible',
            typeUser:"user",
            vue: false // La notification est par défaut non vue

        });
        await notification.save(); 


        return res.status(200).send({message:'enregistrement reussi', data: ecriture_id})
        
    } catch (error) {
        return res.status(500).send({message: error});

    }
}
exports.getEcriture = async(req, res) => {
    try {
        let allData = await Ecrit.find().populate('utilisateur_id').populate('contenu1_id').populate('contenu2_id').populate('contenu3_id');
  
        return res.status(200).send({message: "All assignments", data: allData});

    } catch (error) {
        return res.status(500).send({message: error});

    }

}
exports.getOneEcriture = async(req, res) =>{
    try{

        let data = await Ecrit.findOne({_id: req.params.id}).populate('utilisateur_id').populate('contenu1_id').populate('contenu2_id').populate('contenu3_id');
        return res.status(200).send({message: " Applications ecrit charg", data: data});

    }catch(error){
        return res.status(500).send({message: "Error getting student applications"})


    }}
    exports.updateEcrit = async (req,res) => {
        try {
            // console.log('UPDATE REQ', req.body);
    
            let assessmentId = req.params.id;
            const commentaire = req.body.commentaire
            const Ecrit_ID = req.body._id
            const note = req.body.note
            const pend = "corrected"
            console.log(Ecrit_ID, commentaire, note);
            
            await Ecrit.updateOne( {"_id": Ecrit_ID},   
                { 
                    $set: { 
                        commentaire: commentaire,
                        note: note,
                        stat: pend 
                    }
                 });
    
            return res.status(200).send({message: "Ecrit  Updated"});
        } catch (error) {
            return res.status(500).send({message: error});
        }
    }
    exports.selEcritStudent = async (req, res) => {

        try {
            let studentId = req.userId;
            
            let data = await Ecrit.find({utilisateur_id: studentId}).populate('contenu1_id').populate('contenu2_id').populate('contenu3_id'); 
           
            return res.status(200).send({message: " Applications", data: data});
        } catch (error) {
            return res.status(500).send({message: error});
        }
    }
    
    exports.markAsReadEcrit = async (req, res) => {
        try {
            const solutionId = req.params.id;
    
            const solution = await Ecrit.findByIdAndUpdate(solutionId, { vue: true }, { new: true });
    
            if (!solution) {
                return res.status(404).send({ message: 'Notification non trouvée' });
            }
    
            return res.status(200).json(solution);
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    };
    