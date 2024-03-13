const personaController= require ('../controllers/personaController');

const express= require('express');


const api=express.Router();

api.get('/personas/getall',personaController.getPersonas);
api.get('/personas/getone/:id',personaController.getPersona);
api.get('/personas/getallpersonas',personaController.getAllPersonas);
api.get('/personas/getonebyvisita/:id',personaController.getPersonaByIdVisita);
api.get('/personas/getonebyapoderado/:id',personaController.getPersonaByIdApoderado);
api.get('/personas/getmany/:idsPersonas',personaController.obtenerInfoAdicionalPersonas);
api.get('/personas/getmanybyrol/:codigo',personaController.getPersonasByRol);


api.post('/personas/create',personaController.createPersona);
api.delete('/personas/delete/:id',personaController.deletePersona);
api.put('/personas/update/:id',personaController.updatePersona);


module.exports=api;