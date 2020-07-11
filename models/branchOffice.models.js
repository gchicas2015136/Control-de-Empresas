'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schema = branchOfficeSchema = Schema({
    name: String,
    address: String,
    phone: Number,
    departament: String,
    email: String,
    products:[{ 
        nameProduct: String,
        stockProduct: Number
    }]
     
});