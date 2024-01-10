const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getEventos= async(req,res)=>{
    try{
        const eventos =  await prisma.Evento.findMany() // select * from visitas

        if(eventos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de eventos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            eventos:eventos,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de eventos"

        })
    }

}

const createEvento= async(req,res)=>{

    const {tema,descripcion,fecha} = req.body;
    try{

        

        const evento = await prisma.Evento.create({
            data:{
                tema,descripcion,fecha
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el evento correctamente",
            evento:evento

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el evento"
        })
    }
}


      

const deleteEvento= async(req,res)=>{
    const {id} = req.params
    try{
        const evento = await prisma.Evento.delete({
            where : {codigo_evento: Number(id)}
        })
        if(!evento){
            return res.status(400).json({
                mensaje:"No se pudo encontrar el evento"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el evento exitosamente",
            evento:evento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar el evento"
        })
    }
};

const getEvento= async(req,res)=>{
    const {id} = req.params
    try{

        const evento = await prisma.Evento.findUnique({
            where : {codigo_evento: Number(id)}
        })
        if (!evento) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar el evento",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado el evento",
            evento:evento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el evento"
        })
    }
};

const updateEvento = async(req,res)=>{
    const {id}=req.params
    const {tema,descripcion,fecha} = req.body
    try{

    const evento =await prisma.Evento.update({
       
    where:{codigo_evento: Number(id)},
    data:{
        tema:tema,
        descripcion:descripcion,
        fecha:fecha
    }
    }) 
       if(!evento){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado a la visita",
        evento:evento 
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar a la visita"
        })
    }
}


const getEventosByDateRange = async (req, res) => {
    const { fechaInicio, fechaTermino } = req.params;
    try {
        const startDate = new Date(fechaInicio);
    
        let eventos;
        if (fechaTermino) {
          // Si fechaTermino está presente, busca eventos en el rango entre startDate y endDate
          const endDate = new Date(fechaTermino);
          eventos = await prisma.Evento.findMany({
            where: {
              fecha: {
                gte: startDate,
                lte: new Date(endDate.getTime() + 24 * 60 * 60 * 1000),
              },
            },
          });
        } else {
          // Si fechaTermino no está presente, busca eventos solo en el día de startDate
          eventos = await prisma.Evento.findMany({
            where: {
              fecha: {
                gte: startDate,
                lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000), // Agrega un día a startDate
              },
            },
          });
        }
        if(eventos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de eventos",fechaInicio:fechaInicio,fechaTermino:fechaTermino,
            })
        }
      return res.status(200).json({
        mensaje: "Se han encontrado eventos entre las fechas dadas",
        eventos: eventos,fechaInicio:fechaInicio,fechaTermino:fechaTermino,
      });
    } catch (error) {
      console.error('Error al obtener eventos por rango de fechas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

module.exports={
getEventos,
createEvento,
deleteEvento,
getEvento,
updateEvento,
getEventosByDateRange
}