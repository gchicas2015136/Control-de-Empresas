'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = Schema({
    name: String,
    lastname: String,
    departament: String,
    phone: Number,
    email: String,
    charge: String,
});

module.exports = mongoose.model('employees', employeeSchema);
