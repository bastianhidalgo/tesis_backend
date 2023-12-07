const cursoController= require ('../controllers/cursoController');

const express= require('express');


const api=express.Router();

api.get('/cursos/getall',cursoController.getCursos);
api.get('/cursos/getone/:id',cursoController.getCurso);


api.post('/cursos/create',cursoController.createCurso);
api.delete('/cursos/delete/:id',cursoController.deleteCurso);
api.put('/cursos/update/:id',cursoController.updateCurso);


module.exports=api;