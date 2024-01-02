const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getPersonas= async(req,res)=>{
    try{
        const Personas =  await prisma.Persona.findMany() // select * from personas

        if(Personas.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de personas"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            Personas:Personas,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de personas"

        })
    }

}
const getAllPersonas=async(req,res)=>{
    try {
        // Obtener todas las visitas y apoderados
        const visitas = await prisma.Visita.findMany();
        const apoderados = await prisma.Apoderado.findMany();
    
        // Devolver las visitas y apoderados como respuesta
        return res.status(200).json({
          mensaje: "Se han encontrado resultados",
          visitas: visitas,
          apoderados: apoderados,
        });
      } catch (error) {
        console.error(error.stack);
        return res.status(400).json({
          mensaje: "Error al obtener el listado de personas",
        });
      }
}


const createPersona = async (req, res) => {
    const { rol, apoderadoId, visitaId, fecha_inicio, fecha_termino } = req.body;

    try {
        const persona = await prisma.Persona.create({
            data: {
                
                rol,
                apoderadoId,
                visitaId,
                fecha_inicio,
                fecha_termino
            }
        });

        return res.status(200).json({
            mensaje: "Se ha creado la persona correctamente",
            persona: persona
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(400).json({
            mensaje: "Error al crear la persona"
        });
    }
};


function validarRut(rut) {
        const cleanRut = Rut(rut).clean();
        return Rut(cleanRut).validate();
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
const deletePersona= async(req,res)=>{
    const {id} = req.params
    try{
        const persona = await prisma.Persona.delete({
            where : {id_persona: Number(id)}
        })
        if(!persona){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a la persona"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado la persona exitosamente",
            persona:persona
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la persona"
        })
    }
};

const getPersona= async(req,res)=>{
    const {id} = req.params
    try{

        const persona = await prisma.Persona.findUnique({
            where : {id_persona: Number(id)}
        })
        if (!persona) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar a la persona",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado a la persona",
            persona:persona
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar la persona"
        })
    }
};
const getPersonaByIdVisita= async(req,res)=>{
    const {id} = req.params
    try{
        const persona = await prisma.Persona.findMany({
            where: {
              visitaId: Number(id),
            },
            include: {
              visita: true,
            },
          });
        if (!persona) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar a la visita",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado a la visita",
            persona:persona
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar la visita"
        })
    }
};
const getPersonaByIdApoderado= async(req,res)=>{
    const {id} = req.params
    try{
        const persona = await prisma.Persona.findMany({
            where: {
              apoderadoId: Number(id),
            },
            include: {
              apoderado: true,
            },
          });

          if (!persona || persona.length===0 ) {
            return res.status(400).json({
              mensaje: "No se pudo encontrar al apoderado",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado al apoderado",
            persona:persona
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar al apoderado"
        })
    }
};

const updatePersona = async(req,res)=>{
    const {id}=req.params
    const {rol,fecha_inicio,fecha_termino} = req.body
    try{

    const persona =await prisma.Persona.update({
       
    where:{id_persona: Number(id)},
    data:{
        rol:rol,
        fecha_inicio:fecha_inicio,
        fecha_termino:fecha_termino
    }
    }) 
       if(!persona){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado a la persona",
        persona:persona
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar a la persona"
        })
    }
}

const obtenerInfoAdicionalPersonas = async (req, res) => {
    try {
        const idsPersonas = req.params.idsPersonas.split(',').map(id => parseInt(id, 10));
  
      // Utiliza Prisma para buscar información adicional de los usuarios basándote en los IDs
      const personas = await prisma.Persona.findMany({
        where: {
          id_persona: {
            in: idsPersonas,
          },
        },
      });
  
      res.json(personas);
    } catch (error) {
      console.error('Error al obtener información adicional de usuarios:', error);
      res.status(500).send('Error interno del servidor');
    }
  };





module.exports={
getPersonas,
getAllPersonas,
createPersona,
deletePersona,
getPersona,
updatePersona,
compararRut,
getPersonaByIdApoderado,
getPersonaByIdVisita,
obtenerInfoAdicionalPersonas



}