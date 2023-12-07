const alumnoController= require ('../controllers/alumnoController');

const express= require('express');


const api=express.Router();

api.get('/alumnos/getall',alumnoController.getAlumnos);
api.get('/alumnos/getone/:id',alumnoController.getAlumno);
api.get('/alumnos/comparar/:rut',alumnoController.compararRut);


api.post('/alumnos/create',alumnoController.createAlumno);
api.delete('/alumnos/delete/:id',alumnoController.deleteAlumno);
api.put('/alumnos/update/:id',alumnoController.updateAlumno);


module.exports=api;