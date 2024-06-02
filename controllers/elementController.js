const Element = require('../models/elementTest');

exports.addElement = async(req, res) => {
    try {

       
        
let data = {
    level: req.body.level,
    question: req.body.questions,
    solutions: req.body.solutions,
    response: req.body.response,
    type: req.body.type,
    imageUrl: req.body.imageUrl

}       
if(data.solutions.length !== 4){
    return res.status(400).json({error: 'vous devez avoir 4 questions exactement'})
}
const element = new Element(data)
element.save();
return res.status(200).send({message: "Created Element"});

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