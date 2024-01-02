const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getFechas= async(req,res)=>{
    try{
        const fechas =  await prisma.Fecha.findMany() // select * from visitas

        if(fechas.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de fechas"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            fechas:fechas,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de fechas"

        })
    }

}

const createFecha= async(req,res)=>{

    const {fecha_ingreso} = req.body;
    try{


        const fecha = await prisma.Fecha.create({
            data:{
                fecha_ingreso: fecha_ingreso,
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado la fecha correctamente",
            fecha:fecha

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear la fecha"
        })
    }
}

const deleteFecha = async (req, res) => {
    const { fecha_ingreso } = req.params;
    try {
        const fecha = await prisma.Fecha.delete({
            where: { fecha_ingreso: new Date(fecha_ingreso) }
        });
        if (!fecha) {
            return res.status(400).json({
                mensaje: "No se pudo encontrar la fecha"
            });
        }

        return res.status(200).json({
            mensaje: "Se ha eliminado la fecha exitosamente",
            fecha: fecha
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "No se pudo encontrar la fecha"
        });
    }
};

const getFecha= async(req,res)=>{
    const {fecha_ingreso} = req.params
    try{

        const fecha = await prisma.Fecha.findUnique({
            where : {fecha_ingreso: new Date(fecha_ingreso)}
        })
        if (!fecha) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar la fecha",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado la fecha ",
            fecha:fecha
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar fecha "
        })
    }
};

const updateFecha = async (req, res) => {
    const { fecha_ingreso } = req.params;
    const { nueva_fecha_ingreso } = req.body;
    try {
        const fechaActualizada = await prisma.Fecha.update({
            where: { fecha_ingreso: new Date(fecha_ingreso) },
            data: {
                fecha_ingreso: new Date(nueva_fecha_ingreso)
            }
        });

        if (!fechaActualizada) {
            return res.status(400).json({
                mensaje: "Error al actualizar la fecha"
            });
        }

        return res.status(200).json({
            mensaje: "Se ha actualizado la fecha correctamente",
            fecha: fechaActualizada
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "Error al actualizar la fecha"
        });
    }
};



module.exports={
getFechas,
createFecha,
deleteFecha,
getFecha,
updateFecha
}