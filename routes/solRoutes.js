const express = require('express');

const solController = require('../controllers/solController')
const verifyRoleMidleware = require("../midlewares/authjwt");

const solRouter = express.Router()
solRouter.post('/solution/create', [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isUser], solController.createSolution)

module.exports = solRouter ;