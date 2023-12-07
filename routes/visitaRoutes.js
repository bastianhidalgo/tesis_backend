const visitaController= require ('../controllers/visitaController');

const express= require('express');


const api=express.Router();

api.get('/usuarios/getall',visitaController.getVisitas);
api.get('/usuarios/getone/:id',visitaController.getVisita);
api.get('/usuarios/comparar/:rut',visitaController.compararRut);
api.get('/usuarios/getmany/:idsVisitas',visitaController.obtenerInfoAdicionalUsuarios);


api.post('/usuarios/create',visitaController.createVisitas);
api.delete('/usuarios/delete/:id',visitaController.deleteVisita);
api.put('/usuarios/update/:id',visitaController.updateVisita);


module.exports=api;