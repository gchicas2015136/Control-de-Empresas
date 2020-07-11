'use strict'

var express = require('express');
var employeeControler = require('../controllers/employee.controller');
var api = express.Router();

api.put('/setEmployee/:id', employeeControler.setEmployee);
api.put('/:idB/updateEmployee/:idE', employeeControler.updateEmployee);
api.put('/:idB/removeEmployee/:idE', employeeControler.removeEmployee);
api.get('/countEmployees/:id', employeeControler.countEmployee);
api.post('/searchEmployee/:idB', employeeControler.searchEmployee);

module.exports = api;