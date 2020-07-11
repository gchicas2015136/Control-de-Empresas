'use strict'

var mongoose = require('mongoose');
var port = 3800;
var app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ControlDeEmpresasDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log('Conexion a la base de datos correcta! :)');
    app.listen(port, ()=>{
        console.log('El servidor esta corriendo en el puerto: ', port);
    });
    }).catch(err =>{
        console.log('Error al conectarse a la base de datos :(');
});