
const express = require('express');
const participantController = require('../controllers/participantController');
const verifyMidleware = require('../midlewares/index');
const tokenMidleWare = require("../midlewares/authjwt");

const participantRouter = express.Router();




module.exports = participantRouter;