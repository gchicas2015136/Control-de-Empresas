'use strict'

BranchOffice = require('../models/branchOffice.models');

function saveBranchOffice(req, res){
    var branch = new BranchOffice();
    var params = req.body;

    if(params.name && params.departament && params.address && params.email && params.phone){
        branch.name = params.name;
        branch.departament = params.departament;
        branch.address = params.address;
        branch.email = params.email;
        branch.phone = params.phone
    }else{
        res.send({message: '!Ingresa los datos necesarios para crear la sucursal!'});
    }

}