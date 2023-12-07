const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const visitaRoutes = require('./routes/visitaRoutes');
const ingresoRoutes = require('./routes/ingresoRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const visitaEventoRoutes = require('./routes/visitaEventoRoutes');
const rolRoutes=require('./routes/rolRoutes')
const alumnoRoutes=require('./routes/alumnoRoutes')
const cursoRoutes=require('./routes/cursoRoutes')
const apoderadoRoutes=require('./routes/apoderadoRoutes')
const apoderadoAlumnoRoutes = require('./routes/apoderadoAlumnoRoutes');


app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.options('*',cors())

app.use('/api',visitaRoutes)
app.use('/api',ingresoRoutes)
app.use('/api',eventoRoutes)
app.use('/api',visitaEventoRoutes)
app.use('/api',rolRoutes)
app.use('/api',alumnoRoutes)
app.use('/api',cursoRoutes)
app.use('/api',apoderadoRoutes)
app.use('/api',apoderadoAlumnoRoutes)





app.listen(process.env.PORT,()=>{
    console.log("El servidor está en el puerto ",process.env.PORT)
})