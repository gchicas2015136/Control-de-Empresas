'use strict'

var express = require('express');
var bussinesController = require('../controllers/bussines.controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

api.post('/saveBussines', bussinesController.saveBussines);
api.delete('/deleteBussines/:id', mdAuth.ensureAuth,bussinesController.removeBussines);
api.put('/updateBussines/:id', mdAuth.ensureAuth,bussinesController.updateBussines);
api.get('/listBussines', mdAuth.ensureAuth,bussinesController.listBussiness);
api.post('/login', bussinesController.login);


module.exports = api;
