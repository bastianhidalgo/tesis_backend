const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAlumnos= async(req,res)=>{
    try{
        const alumnos =  await prisma.Alumno.findMany() // select * from visitas

        if(alumnos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de alumnos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            alumnos:alumnos,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de visitas"

        })
    }

}

const createAlumno= async(req,res)=>{
    const {rut,nombre,apellido,cursoId} = req.body;
    try{

        if(!useRegexNombre(req.body.nombre)){
            return res.status(406).json({
                message: 'nombre invalido'
          })
        }
        if(!useRegexNombre(req.body.apellido)){
            return res.status(406).json({
                message: 'apellido invalido'
          })
        }
        if(!useRegexRut(req.body.rut)){
            return res.status(406).json({
                message: 'Rut invalido'
          });
        }

        const alumno = await prisma.Alumno.create({
            data:{
                rut,nombre,apellido,cursoId
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el alumno correctamente",
            alumno:alumno

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el alumno"
        })
    }
}

function validarRut(rut) {
        const cleanRut = Rut(rut).clean();
        return Rut(cleanRut).validate();
      }

      
const compararRut= async(req,res)=>{
    const {rut}=req.params
    
    try{
        const alumno = await prisma.Alumno.findMany({
            where : {rut: String(rut)}
    })   
     if(!useRegexRut(req.params.rut)){
        return res.status(406).json({
            message: 'Rut invalido'
      });
    }
    if (alumno.length === 0) { // Verificamos si el array de visitas está vacío
        return res.status(400).json({
          mensaje: "No se pudo encontrar al alumno",
        });
      }
    return res.status(200).json({
        mensaje:"Persona admitida",
        alumno:alumno
    })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar al alumno"
    })


}
}
const deleteAlumno= async(req,res)=>{
    const {id} = req.params
    try{
        const alumno = await prisma.Alumno.delete({
            where : {id_alumno: Number(id)}
        })
        if(!alumno){
            return res.status(400).json({
                mensaje:"No se pudo encontrar al alumno"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el alumno exitosamente",
            alumno:alumno
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar al alumno"
        })
    }
};

const getAlumno= async(req,res)=>{
    const {id} = req.params
    try{

        const alumno = await prisma.Alumno.findUnique({
            where : {id_alumno: Number(id)}
        })
        if (!alumno) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar al alumno",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado al alumno",
            alumno:alumno
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el alumno"
        })
    }
};
const getAlumnosPorCurso = async (req, res) => {
    const { id } = req.params;
  
    try {
      const alumnos = await prisma.Alumno.findMany({
        where: {
          cursoId: Number(id),
        },
      });
  
      if (!alumnos.length) {
        return res.status(202).json({
          mensaje: "No se encontraron alumnos para este curso",
        });
      }
  
      return res.status(200).json({
        mensaje: "Alumnos encontrados",
        alumnos: alumnos,
      });
    } catch (error) {
      console.error(error.stack);
      return res.status(500).json({
        mensaje: "Error al buscar alumnos por curso",
      });
    }
  };
const updateCursoAlumno = async(req,res)=>{
    const {id}=req.params
    const {cursoId} = req.body
    try{

    const alumno =await prisma.Alumno.update({
       
    where:{id_alumno: Number(id)},
    data:{
        cursoId:cursoId
    }
    }) 
       if(!alumno){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado el curso del alumno",
        alumno:alumno
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar el curso del alumno"
        })
    }
}


const updateAlumno = async(req,res)=>{
    const {id}=req.params
    const {rut,nombre,apellido} = req.body
    try{

    const alumno =await prisma.Alumno.update({
       
    where:{id_alumno: Number(id)},
    data:{
        rut:rut,
        nombre:nombre,
        apellido:apellido
        
    }
    }) 
       if(!alumno){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado al alumno",
        alumno:alumno
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar al alumno"
        })
    }
}



module.exports={
getAlumnos,
createAlumno,
deleteAlumno,
getAlumno,
updateAlumno,
compararRut,
updateCursoAlumno,
getAlumnosPorCurso
}