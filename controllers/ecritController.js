const Ecrit = require('../models/Ecirt');

exports.addEcriture = async(req, res) =>{
    const user_id = req.params.id;
    let  academicYear = req.params.academicYear;

    try {
        let data = {
            user_id,
            contenu1: req.body.contenu1,
            contenu2: req.body.contenu2,
            contenu3: req.body.contenu3,

  
        }

        let eriture = new Ecrit(data);
        let ecriture_id = eriture._id;

        await eriture.save();
        return res.status(200).send({message:'enregistrement reussi', data: ecriture_id})
        
    } catch (error) {
        return res.status(500).send({message: error});

    }
}
exports.getEcriture = async(req, res) => {
    try{


    }catch(error)
    {

    }

}
exports.getOneEcriture = async(req, res) =>{
    try{

    }catch(error)
{

}}