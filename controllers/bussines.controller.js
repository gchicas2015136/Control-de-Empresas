'use strict'

var Bussines = require('../models/business.models');
var Employee = require('../models/employees.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function saveBussines(req, res){
    var business = new Bussines();
    var params = req.body;

    if(params.name && params.address && params.phone && params.email){
        business.name = params.name;
        business.address = params.address;
        business.phone = params.phone;
        business.email = params.email;
        business.activity = params.activity;
        business.user = params.user;
        business.legalStructure = params.legalStructure;

        Bussines.findOne({$or:[{name: params.name, address: params.address}]}, (err, bussinesNameFinded)=>{
            if(err){
                res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(bussinesNameFinded){
                res.status(418).send({message: '!Nombre o direccion de la empresa ya en uso!'});
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                    if(err){
                        res.status(500).send({message: 'Error al encriptar la la contraseña! :('});
                    }else if(passwordHash){
                        business.password = passwordHash;

                        business.save((err, bussinesSaved)=>{
                            if(err){
                                res.status(500).send({message: 'ERROR GENERAL'});
                            }else if(bussinesSaved){
                                res.send({message: 'Empresa agregada exitosamente',bussinesSaved});
                            }else{
                                res.send({message: 'Error al intentar guardar la Empresa'});
                            }
                       });
                    }else{
                        res.status(404).send({message: 'Empresa no creada'})
                    }
                });
            }
        });
    }else{
        res.send({message: '!Ingrese los datos necesarios!'});
    }
}

function updateBussines(req, res){
    var bussinesId = req.params.id;
    var update = req.body;

    Bussines.findByIdAndUpdate(bussinesId, update, {new: true}, (err, bussinesUpdated)=>{
        if(err){
            res.status(500).send({message: 'ERROR GENERAL'});
        }else if(bussinesUpdated){
            res.send({Empresa: 'Actualizacion exitosa', bussinesUpdated});
        }else{
            res.status(404).send({message: 'No se logro actualizar a la empresa, empresa no encontrada'});
        }
    });
}

function removeBussines (req, res){
    let bussinesId = req.params.id;

    Bussines.findByIdAndRemove(bussinesId, (err, bussinesRemoved)=>{
        if(err){
            res.status(500).send({message:'ERROR GENERAL'});
        }else if(bussinesRemoved){
            res.send({message: 'Empresa eliminada exitosamente'});
        }else{
            res.status(404).send({message: 'ERROR al tratar de eliminar la Empresa'});
        }
    });
}

function listBussiness(req, res){
    Bussines.find({}, (err, bussines)=>{
        if(err){
            res.status(500).send({message: 'ERROR GENERAL'});
        }else if(bussines){
            res.send({bussines});
        }else{
            res.status(418).send({message: 'Sin datos que mostrar!'});
        }

    });


}

function login(req, res){
    var params = req.body;

    if(params.user || params.email){
        if(params.password){
            Bussines.findOne({$or:[{user: params.user},
            {email: params.email}]}, (err, check)=>{
                if(err){
                    res.status(500).send({message: 'ERROR GENERAL'});
                }else if(check){
                    bcrypt.compare(params.password, check.password, (err, passwordOK)=>{
                        if(err){
                            res.status(500).send({message: 'ERROR en la comparacion' ,err});
                        }else if(passwordOK){
                            if(params.gettoken = true){
                                res.send({token: jwt.createToken(check)});
                            }else{
                                res.send({message: 'Bienvenido! :)', bussines: check});
                            }
                        }else{
                            res.send({message: 'Contraseña incorrecta :('});
                        }
                    });
                }else{
                    res.send({message: '!Datos del usuario incorrectos!'});
                }
            });
        }else{
            res.send({message: 'Ingresa la contraseña'});
        }
    }else{
        res.send({message: '¡Ingresa tu correo electronico o contraseña!'});
    }
}


module.exports = {
    saveBussines,
    updateBussines,
    removeBussines,
    listBussiness,
    login

}


