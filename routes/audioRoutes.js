const express = require('express');
const audioControl = require("../controllers/audioController");
const verifyMidleware = require("../midlewares/authjwt");

const audioRouter = express.Router();

module.exports = audioRouter;