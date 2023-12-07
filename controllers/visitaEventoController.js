const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const eventosController= require ('../controllers/eventoController');

const getVisitaEventos= async(req,res)=>{
    try{
        const visitaEvento =  await prisma.VisitaEvento.findMany() // select * from ingreso

        if(visitaEvento.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de ingresos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            visitaEvento:visitaEvento,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de ingresos"

        })
    }

}

const createVisitaEvento= async(req,res)=>{
    

    const {eventoId,visitaId} = req.body;


    try{
        

        const VisitaEvento = await prisma.VisitaEvento.create({
            data:{
                evento:{
                    connect: {
                        codigo_evento: eventoId
                    }
                },      visita: {
                    connect: {
                      id_visita: visitaId // Suponiendo que visitaId es el ID del objeto Visita relacionado
                    }
                  }
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado la visita correctamente",
            VisitaEvento:VisitaEvento

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
const getVisitaEvento= async(req,res)=>{
    const {codigo_evento,id_visita} = req.params
    try{

        const visitaEvento = await prisma.VisitaEvento.findUnique({
            where: {
              eventoId_visitaId: {
                eventoId: Number(codigo_evento),
                visitaId: Number(id_visita),
              },
            },
          });
        if (!visitaEvento) {
            return res.status(400).json({
              mensaje: "No se pudo encontrar a el ingreso",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado a el ingreso",
            visitaEvento:visitaEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el ingreso"
        })
    }
};
const getVisitasPorEvento= async(req,res)=>{
    
    try{
        const {eventoId} = req.params
        const visitasEvento = await prisma.VisitaEvento.findMany({
            where: {
                eventoId: parseInt(eventoId),
              },
              select: {
                visitaId: true,
              },
          });

          const idsVisitasArray = visitasEvento.map((visita) => visita.visitaId);
          res.status(200).json({ idsVisitas: idsVisitasArray });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los IDs de visitas por evento' });
        }
      };

const deleteVisitaEvento= async(req,res)=>{
    const {codigo_evento,id_visita} = req.params
    try{

        const visitaEvento = await prisma.VisitaEvento.delete({
            where: {
              eventoId_visitaId: {
                eventoId: Number(codigo_evento),
                visitaId: Number(id_visita),
              },
            },
          });
        if(!visitaEvento){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a la visita"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado la visita exitosamente",
            visitaEvento:visitaEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la visita"
        })
    }
};




module.exports={
getVisitaEventos,
createVisitaEvento,
getVisitaEvento,
deleteVisitaEvento,
compararRut,
getVisitasPorEvento
}