const fechaController= require ('../controllers/fechaController');

const express= require('express');


const api=express.Router();

api.get('/fecha/getall',fechaController.getFechas);
api.get('/fecha/getone/:fecha_ingreso',fechaController.getFecha);


api.post('/fecha/create',fechaController.createFecha);
api.delete('/fecha/delete/:fecha_ingreso',fechaController.deleteFecha);
api.put('/fecha/update/:fecha_ingreso',fechaController.updateFecha);


module.exports=api;