const Element = require('../models/elementTest')
const AcademicYear = require('../models/AcademicYear ')

exports.addElement = async(req, res) => {
    try {

       
        if(questions.length !== 4){
            return res.status(400).json({error: 'vous devez avoir 4 questions exactement'})
        }
let data = {
    level: req.body.level,
    questions: req.body.questions,
    response: req.body.response,
    imageUrl: req.body.imageUrl

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