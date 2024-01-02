const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const eventosController= require ('./eventoController');

const getPersonasEventos= async(req,res)=>{
    try{
        const PersonaEvento =  await prisma.PersonaEvento.findMany() // select * from ingreso

        if(visitaEvento.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de ingresos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            PersonaEvento:PersonaEvento,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de ingresos"

        })
    }

}

const createPersonaEvento= async(req,res)=>{
    

    const {eventoId,personaId} = req.body;
    try{
        

        const PersonaEvento = await prisma.PersonaEvento.create({
            data:{
                evento:{
                    connect: {
                        codigo_evento: eventoId
                    }
                },      persona: {
                    connect: {
                      id_persona: personaId // Suponiendo que visitaId es el ID del objeto Visita relacionado
                    }
                  }
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el ingreso al evento correctamente",
            PersonaEvento:PersonaEvento

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


const getPersonaEvento= async(req,res)=>{
    const {codigo_evento,id_persona} = req.params
    try{

        const PersonaEvento = await prisma.PersonaEvento.findUnique({
            where: {
              eventoId_personaId: {
                eventoId: Number(codigo_evento),
                personaId: Number(id_persona),
              },
            },
          });
        if (!PersonaEvento) {
            return res.status(400).json({
              mensaje: "No se pudo encontrar a el ingreso",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado a el ingreso",
            PersonaEvento:PersonaEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el ingreso"
        })
    }
};
const getPersonasPorEvento= async(req,res)=>{
    
    try{
        const {eventoId} = req.params
        const PersonaEvento = await prisma.PersonaEvento.findMany({
            where: {
                eventoId: parseInt(eventoId),
              },
              select: {
                personaId: true,
              },
          });

          const idsPersonasArray = PersonaEvento.map((persona) => persona.personaId);
          res.status(200).json({ idsPersonas: idsPersonasArray });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los IDs de visitas por evento' });
        }
      };

const deletePersonaEvento= async(req,res)=>{
    const {codigo_evento,id_persona} = req.params
    try{

        const PersonaEvento = await prisma.PersonaEvento.delete({
            where: {
              eventoId_personaId: {
                eventoId: Number(codigo_evento),
                personaId: Number(id_persona),
              },
            },
          });
        if(!PersonaEvento){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a la persona"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado la persona exitosamente",
            PersonaEvento:PersonaEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la persona"
        })
    }
};




module.exports={
getPersonasEventos,
createPersonaEvento,
getPersonaEvento,
deletePersonaEvento,
compararRut,
getPersonasPorEvento
}