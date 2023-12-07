const eventosController= require ('../controllers/eventoController');

const express= require('express');


const api=express.Router();

api.get('/eventos/getall',eventosController.getEventos);
api.get('/eventos/getone/:id',eventosController.getEvento);
api.get('/eventos/getallbydate/:fechaInicio/:fechaTermino?',eventosController.getEventosByDateRange);

api.post('/eventos/create',eventosController.createEvento);
api.delete('/eventos/delete/:id',eventosController.deleteEvento);
api.put('/eventos/update/:id',eventosController.updateEvento);


module.exports=api;