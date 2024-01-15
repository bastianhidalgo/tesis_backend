const cursoEventoController= require ('../controllers/cursoEventoController');

const express= require('express');


const api=express.Router();

api.get('/cursoEvento/getall',cursoEventoController.getCursosEventos);
api.get('/cursoEvento/getone/:id_curso/:codigo_evento',cursoEventoController.getCursoEvento);
api.get('/cursoEvento/getEventos/:cursoId',cursoEventoController.getEventosporCurso);
api.get('/cursoEvento/getCursos/:eventoId',cursoEventoController.getCursosporEvento);


api.post('/cursoEvento/create',cursoEventoController.createCursoEvento);
api.delete('/cursoEvento/delete/:id_curso/:codigo_evento',cursoEventoController.deleteCursoEvento);
api.delete('/cursoEvento/deleteEventos/:codigo_evento',cursoEventoController.deleteEventos);

module.exports=api;