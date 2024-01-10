const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const eventosController= require ('../controllers/eventoController');

const getApoderadosAlumnos= async(req,res)=>{
    try{
        const ApoderadoAlumno =  await prisma.ApoderadoAlumno.findMany() // select * from ingreso

        if(ApoderadoAlumno.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de apoderados con alumnos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            ApoderadoAlumno:ApoderadoAlumno,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de apoderados y alumnos"

        })
    }

}

const createApoderadoAlumno = async (req, res) => {
    const { apoderadoId, alumnoId } = req.body;
  
    try {
      // Consultar si ya existe la relación
      const existeRelacion = await prisma.ApoderadoAlumno.findFirst({
        where: {
          apoderadoId: apoderadoId,
          alumnoId: alumnoId,
        },
      });
  
      if (existeRelacion) {
        return res.status(400).json({
          mensaje: "La relación ya existe",
        });
      }
  
      // Si no existe, crear la relación
      const apoderadoAlumno = await prisma.ApoderadoAlumno.create({
        data: {
          apoderado: {
            connect: {
              id_apoderado: apoderadoId,
            },
          },
          alumno: {
            connect: {
              id_alumno: alumnoId,
            },
          },
        },
      });
  
      return res.status(200).json({
        mensaje: "Se ha creado la relación correctamente",
        apoderadoAlumno: apoderadoAlumno,
      });
    } catch (error) {
      console.log(error.stack);
      return res.status(500).json({
        mensaje: "Error al crear la relación",
      });
    }
  };

const getApoderadoAlumno= async(req,res)=>{
    const {id_apoderado,id_alumno} = req.params
    try{

        const ApoderadoAlumno = await prisma.ApoderadoAlumno.findUnique({
            where: {
              apoderadoId_alumnoId: {
                apoderadoId: Number(id_apoderado),
                alumnoId: Number(id_alumno),
              },
            },
          });
        if (!ApoderadoAlumno) {
            return res.status(400).json({
              mensaje: "No se pudo encontrar a el ingreso",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado coincidencia",
            ApoderadoAlumno:ApoderadoAlumno
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el ingreso"
        })
    }
};



const getAlumnosporApoderado= async(req,res)=>{
    
    try{
        const {apoderadoId} = req.params
        const ApoderadoAlumno = await prisma.ApoderadoAlumno.findMany({
            where: {
                apoderadoId: parseInt(apoderadoId),
              },
              select: {
                alumnoId: true,
              },
          });

          if(ApoderadoAlumno.length==0){
            return res.status(400).json({
                mensaje:"No se pudo encontrar al apoderado"
            })
        }
          const idsAlumnosArray = ApoderadoAlumno.map((alumno) => alumno.alumnoId);
          res.status(200).json({ idsAlumnos: idsAlumnosArray });

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los IDs de alumnos por apoderado' });
        }
      };




      const getApoderadosporAlumno= async(req,res)=>{
    
        try{
            const {alumnoId} = req.params
            const ApoderadoAlumno = await prisma.ApoderadoAlumno.findMany({
                where: {
                    alumnoId: parseInt(alumnoId),
                  },
                  select: {
                    apoderadoId: true,
                  },
              });
    
              const idsApoderadosArray = ApoderadoAlumno.map((apoderado) => apoderado.apoderadoId);
              
              res.status(200).json({ idsApoderados: idsApoderadosArray });

            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Error al obtener los IDs de alumnos por apoderado' });
            }
          };

const deleteApoderadoAlumno= async(req,res)=>{
    const {id_apoderado,id_alumno} = req.params
    try{

        const ApoderadoAlumno = await prisma.ApoderadoAlumno.delete({
            where: {
              apoderadoId_alumnoId: {
                apoderadoId: Number(id_apoderado),
                alumnoId: Number(id_alumno),
              },
            },
          });
        if(!ApoderadoAlumno){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a Apoderado y Alumno"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el registro exitosamente",
            ApoderadoAlumno:ApoderadoAlumno
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar el registro"
        })
    }
};
const deleteApoderado = async (req, res) => {
  const { id_apoderado } = req.params;
  try {
      // Eliminar todos los registros asociados al apoderado
      const deletedRecords = await prisma.ApoderadoAlumno.deleteMany({
          where: {
              apoderadoId: Number(id_apoderado),
          },
      });

      if (!deletedRecords.count) {
          return res.status(400).json({
              mensaje: "No se encontraron registros asociados al apoderado",
          });
      }

      return res.status(200).json({
          mensaje: "Se han eliminado todos los registros asociados al apoderado exitosamente",
          cantidadEliminada: deletedRecords.count,
      });
  } catch (error) {
      console.log(error.stack);
      return res.status(400).json({
          mensaje: "No se pudo completar la eliminación de registros",
      });
  }
};




module.exports={
getApoderadosAlumnos,
createApoderadoAlumno,
getApoderadoAlumno,
deleteApoderadoAlumno,
getAlumnosporApoderado,
getApoderadosporAlumno,
deleteApoderado
}