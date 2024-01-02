const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getIngresos= async(req,res)=>{
    try{
        const ingresos =  await prisma.Ingreso.findMany() // select * from ingreso

        if(ingresos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de ingresos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            ingresos:ingresos,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de ingresos"

        })
    }

}

const createIngreso= async(req,res)=>{
    
    const {fechaIngreso,personaId} = req.body;
    try{

        const ingreso = await prisma.Ingreso.create({
            data:{
                fechaIngreso, personaId // Suponiendo que visitaId es el ID del objeto Visita relacionado
                    
                  
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado la visita correctamente",
            ingreso:ingreso

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el ingreso"
        })
    }
}


const compararRut= async(req,res)=>{
    const {rut}=req.params
    
    try{
        const visita = await prisma.visita.findMany({
            where : {rut: String(rut)}
    })   
     if(!useRegexRut(req.params.rut)){
        return res.status(406).json({
            message: 'Rut invalido'
      });
    }
    if (visita.length === 0) { // Verificamos si el array de visitas está vacío
        return res.status(400).json({
          mensaje: "No se pudo encontrar a la visita",
        });
      }
    return res.status(200).json({
        mensaje:"Persona admitida",
        visita:visita
    })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la visita"
    })
}
}
const deleteIngreso = async (req, res) => {
    const { fechaIngreso } = req.params;

    try {
        const ingreso = await prisma.Ingreso.delete({
            where: { fechaIngreso: new Date(fechaIngreso) }
        });

        if (!ingreso) {
            return res.status(400).json({
                mensaje: "No se pudo encontrar el ingreso"
            });
        }

        return res.status(200).json({
            mensaje: "Se ha eliminado el ingreso exitosamente",
            ingreso: ingreso
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "No se pudo encontrar el ingreso"
        });
    }
};
const getIngreso = async (req, res) => {
    const { fechaIngreso } = req.params;
    try {
        const ingreso = await prisma.Ingreso.findUnique({
            where: { fechaIngreso: new Date(fechaIngreso) }
        });

        if (!ingreso) {
            return res.status(400).json({
                mensaje: "No se pudo encontrar el ingreso",
            });
        }

        return res.status(200).json({
            mensaje: "Se ha encontrado el ingreso",
            ingreso: ingreso
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "Error al encontrar el ingreso"
        });
    }
};
const getIngresosPorPersona = async (req, res) => {
    const { id } = req.params;
    try {
        // Busca la persona por el ID y obtén todos los ingresos asociados
        const ingresos = await prisma.Ingreso.findMany({
            where: { personaId: parseInt(id) },
        });

        return res.status(200).json({
            mensaje: "Se han encontrado los ingresos de la persona",
            ingresos: ingresos
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "Error al encontrar los ingresos de la persona"
        });
    }
};

const getIngresosByDateRange = async (req, res) => {
    const { fechaInicio, fechaTermino } = req.params;
    try {
        const startDate = new Date(fechaInicio);
    
        let ingresos;
        if (fechaTermino) {
          // Si fechaTermino está presente, busca eventos en el rango entre startDate y endDate
          const endDate = new Date(fechaTermino);
          ingresos = await prisma.Ingreso.findMany({
            where: {
              fechaIngreso: {
                gte: startDate,
                lte: new Date(endDate.getTime() + 24 * 60 * 60 * 1000),
              },
            },
          });
        } else {
          // Si fechaTermino no está presente, busca eventos solo en el día de startDate
          ingresos = await prisma.Ingreso.findMany({
            where: {
              fechaIngreso: {
                gte: startDate,
                lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000), // Agrega un día a startDate
              },
            },
          });
        }
        if(ingresos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de ingresos",fechaInicio:fechaInicio,fechaTermino:fechaTermino,
            })
        }
      return res.status(200).json({
        mensaje: "Se han encontrado ingresos entre las fechas dadas",
        ingresos: ingresos,fechaInicio:fechaInicio,fechaTermino:fechaTermino,
      });
    } catch (error) {
      console.error('Error al obtener ingesos por rango de fechas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };



module.exports={
getIngresos,
createIngreso,
deleteIngreso,
getIngreso,
compararRut,
getIngresosPorPersona,
getIngresosByDateRange
}