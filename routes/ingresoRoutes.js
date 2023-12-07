const ingresoController= require ('../controllers/ingresoController');

const express= require('express');


const api=express.Router();

api.get('/ingresos/getall',ingresoController.getIngresos);
api.get('/ingresos/getone/:id',ingresoController.getIngreso);
api.get('/ingresos/comparar/:rut',ingresoController.compararRut);

api.post('/ingresos/create',ingresoController.createIngreso);
api.delete('/ingresos/delete/:id',ingresoController.deleteIngreso);
api.put('/ingresos/update/:id',ingresoController.updateIngreso);


module.exports=api;