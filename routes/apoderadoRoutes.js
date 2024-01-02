const apoderadoController= require ('../controllers/apoderadoController');

const express= require('express');


const api=express.Router();

api.get('/apoderados/getall',apoderadoController.getApoderados);
api.get('/apoderados/getone/:id',apoderadoController.getApoderado);
api.get('/apoderados/comparar/:rut',apoderadoController.compararRut);
api.get('/apoderados/getmany/:idsApoderados',apoderadoController.obtenerInfoAdicionalApoderados);


api.post('/apoderados/create',apoderadoController.createApoderado);
api.delete('/apoderados/delete/:id',apoderadoController.deleteApoderado);
api.put('/apoderados/update/:id',apoderadoController.updateApoderado);


module.exports=api;