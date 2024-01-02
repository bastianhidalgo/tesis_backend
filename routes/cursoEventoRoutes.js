const cursoEventoController= require ('../controllers/cursoEventoController');

const express= require('express');


const api=express.Router();

api.get('/cursoEvento/getall',cursoEventoController.getCursosEventos);
api.get('/cursoEvento/getone/:id_curso/:codigo_evento',cursoEventoController.getCursoEvento);
api.get('/cursoEvento/getEventos/:cursoId',cursoEventoController.getEventosporCurso);


api.post('/cursoEvento/create',cursoEventoController.createCursoEvento);
api.delete('/cursoEvento/delete/:id_curso/:codigo_evento',cursoEventoController.deleteCursoEvento);


module.exports=api;