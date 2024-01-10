const apoderadoAlumnoController= require ('../controllers/apoderadoAlumnoController');

const express= require('express');


const api=express.Router();

api.get('/alumnoApoderado/getall',apoderadoAlumnoController.getApoderadosAlumnos);
api.get('/alumnoApoderado/getone/:id_apoderado/:id_alumno',apoderadoAlumnoController.getApoderadoAlumno);
api.get('/alumnoApoderado/getAlumnos/:apoderadoId',apoderadoAlumnoController.getAlumnosporApoderado);
api.get('/alumnoApoderado/getApoderados/:alumnoId',apoderadoAlumnoController.getApoderadosporAlumno);



api.post('/alumnoApoderado/create',apoderadoAlumnoController.createApoderadoAlumno);
api.delete('/alumnoApoderado/delete/:id_apoderado/:id_alumno',apoderadoAlumnoController.deleteApoderadoAlumno);
api.delete('/alumnoApoderado/deleteApoderado/:id_apoderado',apoderadoAlumnoController.deleteApoderado);


module.exports=api;