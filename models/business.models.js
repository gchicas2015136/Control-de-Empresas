'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = Schema({
    name: String,
    legalStructure: String,
    address: String,
    phone: Number,
    email: String,
    user: String,
    password: String,
    activity: String,
    employees:[{ 
        type: Schema.Types.ObjectId, ref: 'employees'
    }],
    branchOffice:[{
        type: Schema.Types.ObjectId, ref: 'branchOffice' 
    }],
    
    stock: [{
        quantity: Number,
        
    }]
    
});

module.exports = mongoose.model('business', businessSchema);
