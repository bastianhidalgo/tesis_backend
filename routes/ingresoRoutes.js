const ingresoController= require ('../controllers/ingresoController');

const express= require('express');


const api=express.Router();

api.get('/ingresos/getall',ingresoController.getIngresos);
api.get('/ingresos/getone/:id',ingresoController.getIngreso);
api.get('/ingresos/getingresosbypersona/:id',ingresoController.getIngresosPorPersona);
api.get('/ingresos/getallbydate/:fechaInicio/:fechaTermino?',ingresoController.getIngresosByDateRange);


api.post('/ingresos/create',ingresoController.createIngreso);

api.delete('/ingresos/delete',ingresoController.deleteIngreso);
api.put('/ingresos/update',ingresoController.updateIngreso);


module.exports=api;