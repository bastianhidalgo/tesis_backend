const personaEventoController= require ('../controllers/personaEventoController');

const express= require('express');


const api=express.Router();

api.get('/visita/getall',personaEventoController.getPersonasEventos);
api.get('/visita/getone/:codigo_evento/:id_persona',personaEventoController.getPersonaEvento);
api.get('/visita/getVisitas/:eventoId',personaEventoController.getPersonasPorEvento);


api.post('/visita/create',personaEventoController.createPersonaEvento);
api.delete('/visita/delete/:codigo_evento/:id_persona',personaEventoController.deletePersonaEvento);


module.exports=api;