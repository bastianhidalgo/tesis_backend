const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const visitaRoutes = require('./routes/visitaRoutes');
const ingresoRoutes = require('./routes/ingresoRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const personaEventoRoutes = require('./routes/personaEventoRoutes');
const rolRoutes=require('./routes/rolRoutes')
const alumnoRoutes=require('./routes/alumnoRoutes')
const cursoRoutes=require('./routes/cursoRoutes')
const apoderadoRoutes=require('./routes/apoderadoRoutes')
const apoderadoAlumnoRoutes = require('./routes/apoderadoAlumnoRoutes');
const cursoEventoRoutes=require('./routes/cursoEventoRoutes')
const fechaRoutes=require('./routes/fechaRoutes')
const personaRoutes=require('./routes/personaRoutes')

app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.options('*',cors())

app.use('/api',visitaRoutes)
app.use('/api',ingresoRoutes)
app.use('/api',eventoRoutes)
app.use('/api',personaEventoRoutes)
app.use('/api',rolRoutes)
app.use('/api',alumnoRoutes)
app.use('/api',cursoRoutes)
app.use('/api',apoderadoRoutes)
app.use('/api',apoderadoAlumnoRoutes)
app.use('/api',cursoEventoRoutes)
app.use('/api',fechaRoutes)
app.use('/api',personaRoutes)




app.listen(process.env.PORT,()=>{
    console.log("El servidor está en el puerto ",process.env.PORT)
})