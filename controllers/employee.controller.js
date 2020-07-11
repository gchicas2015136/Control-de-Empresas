'use strict'


var Bussines = require('../models/business.models');


function setEmployee(req, res){
    let bussinesId = req.params.id;
    let paramsEmployee = req.body;
    let employee = new Employee();

    Bussines.findById(bussinesId, (err, bussinesOk)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(bussinesOk){
            if(paramsEmployee.name && paramsEmployee.phone && paramsEmployee.charge && paramsEmployee.departament && paramsEmployee.lastname && paramsEmployee.email){
               
                employee.name = paramsEmployee.name;
                employee.lastname = paramsEmployee.lastname;
                employee.phone = paramsEmployee.phone;
                employee.charge = paramsEmployee.charge;
                employee.departament = paramsEmployee.departament;
                employee.email = paramsEmployee.email;

                Bussines.findByIdAndUpdate(bussinesId, {$push:{employees: employee}}, {new:true},(err, employeeUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(employeeUpdated){
                        res.send({employee: employeeUpdated});
                    }else{
                        res.status(404).send({message: 'Empresa no actualizada'});
                    }
                });
            }else{
                res.status(200).send({message: 'Ingrese los datos minimos para agregar un empleado'});
            }
        }else{
            res.status(404).send({message: 'Empresa inexistente'});
        }
    });
}

function updateEmployee(req, res){
    
}

function removeEmployee(req, res){
    let bussinesId = req.params.idB;
    let employeeId = req.params.idE;

    Bussines.findOneAndUpdate({_id: bussinesId, "employees._id":employeeId}, 
    {$pull:{employees:{_id:employeeId}}}, {new:true}, (err, employeeUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(employeeUpdated){
            res.send({employee: employeeUpdated});
        }else{
            res.status(418).send({message: 'Empleado no eliminado'});
        }
    });

}

function countEmployee(req, res){
    var bussinesId = req.params.id;
    Bussines.findById(bussinesId, (err, bussinesFinded)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(bussinesFinded){   
            res.send({Count: bussinesFinded.employees.length});
        }else{
            res.status(404).send({message: 'Error en el conteo'});
        }
    });
}

function searchEmployee(req, res){
    var bussinesId = req.params.idB;
    var employeeId = req.params.idE;
    let params = req.body;

    if(params.search){

        Bussines.findById(bussinesId, (err, bussinesFinded)=>{
            if(err){
                res.status(500).send({message: 'ERROR GENERAL'});
            }else if(bussinesFinded){
                Bussines.find({$or:[{'employees.$.name':{$regex: params.search, $options: 'i'}}, 
                    {'employees.$.lastname':{$regex: params.search, $options: 'i'}}, 
                    {'employees.$._id':{$regex: params.search, $options: 'i'}}, 
                    {'employees.$.charge': {$regex: params.search, $options: 'i'}}, 
                    {'employees.$.departament': {$regex:params.search, $options: 'i'}}]}, (err, employeeFinded)=>{
                    if(err){
                        res.status(500).send({message: 'ERROR GENERAL', err});
                    }else if(employeeFinded){
                        res.send({employees: employeeFinded});
                    }else{
                        res.status(404).send({message: 'Empleado no encontrado'})
                    }
                });
            }else{
                res.status(404).send({message: 'Empresa no encontrada!'});
            }
        });
    }

}

module.exports = {
    setEmployee,
    updateEmployee,
    removeEmployee,
    countEmployee,
    searchEmployee
}