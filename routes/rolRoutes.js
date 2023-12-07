const rolController= require ('../controllers/rolController');

const express= require('express');


const api=express.Router();

api.get('/rol/getall',rolController.getRoles);
api.get('/rol/getone/:codigo',rolController.getRol);


api.post('/rol/create',rolController.createRol);
api.delete('/rol/delete/:codigo',rolController.deleteRol);
api.put('/rol/update/:codigo',rolController.updateRol);


module.exports=api;