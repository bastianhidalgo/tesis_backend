const visitaEventoController= require ('../controllers/visitaEventoController');

const express= require('express');


const api=express.Router();

api.get('/visita/getall',visitaEventoController.getVisitaEventos);
api.get('/visita/getone/:codigo_evento/:id_visita',visitaEventoController.getVisitaEvento);
api.get('/visita/comparar/:rut',visitaEventoController.compararRut);
api.get('/visita/getVisitas/:eventoId',visitaEventoController.getVisitasPorEvento);


api.post('/visita/create',visitaEventoController.createVisitaEvento);
api.delete('/visita/delete/:codigo_evento/:id_visita',visitaEventoController.deleteVisitaEvento);


module.exports=api;