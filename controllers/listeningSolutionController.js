const express = require('express')
const ListeningSolution = require('../models/listeningSolution');
const User = require("../models/User");

exports.addListening = async(req, res) => {
    let userId = req.params.id;

    try {
        let body = {
            userId,
            level: req.body.level,
            point: req.body.point,
            erreur: req.body.erreur
        }
        let listening = new ListeningSolution(data);
        let listening_id = listening._id

        await listening.save();
        return res.status(200).send({message: 'enregistrement validé', data: listening_id }) 
        
        
    } catch (error) {
        return res.status(500).send({message: error});

    }
}
