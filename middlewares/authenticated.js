'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'Tokens_Key_123';

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Peticion sin autentificacion'});
    }else{
        var token = req.headers.authorization.replace(/['"]+/g, '');
        try{
            var payload = jwt.decode(token, key);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: 'Token Expirado'});
            }
        }catch(ex){
            return res.status(404).send({message: 'Token no valido'});
        }
        req.bussines = payload;
        next();
    }
}

/*
exports.ensureAuthAdmin = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Peticion sin autorizacion'});
    }else{
        var token = req.headers.authorization.replace(/['"]+/g, '');
        try{
            var payload = jwt.decode(token, key);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message:'Token expirado'});
            }else if(payload.role != 'Admin'){
                res.status(401).send({message: 'No tienes permisos para esta accion'});
            }
        }catch(ex){
            return res.status(404).send({message: 'Token no valido'});
        }
        req.bussines = payload;
    }
}
 */