const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const eventosController= require ('../controllers/eventoController');

const getCursosEventos= async(req,res)=>{
    try{
        const CursoEvento =  await prisma.CursoEvento.findMany() // select * from ingreso

        if(CursoEvento.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de eventos por curso"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            CursoEvento:CursoEvento,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de cursos y eventos"

        })
    }

}

const createCursoEvento= async(req,res)=>{

    const {cursoId,eventoId} = req.body;

    try{


        const CursoEvento = await prisma.CursoEvento.create({
            data:{
                curso:{
                    connect: {
                        id_curso: cursoId
                    }
                },      evento: {
                    connect: {
                      codigo_evento: eventoId
                    }
                  }
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado la relacion correctamente",
            CursoEvento:CursoEvento

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear la relacion"
        })
    }
}

const getCursoEvento= async(req,res)=>{
    const {id_curso,codigo_evento} = req.params
    try{

        const CursoEvento = await prisma.CursoEvento.findUnique({
            where: {
                eventoId_cursoId: {
                    eventoId: Number(codigo_evento),
                    cursoId: Number(id_curso),
              },
            },
          });
        if (!CursoEvento) {
            return res.status(400).json({
              mensaje: "No se pudo encontrar la coincidencia",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado coincidencia",
            CursoEvento:CursoEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el ingreso"
        })
    }
};
const getEventosporCurso= async(req,res)=>{
    
    try{
        const {cursoId} = req.params
        const CursoEvento = await prisma.CursoEvento.findMany({
            where: {
                cursoId: parseInt(cursoId),
              },
              select: {
                eventoId: true,
              },
          });

          const idsEventosArray = CursoEvento.map((evento) => evento.eventoId);
          res.status(200).json({ idsEventos: idsEventosArray });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los IDs de alumnos por apoderado' });
        }
      };

      const getCursosporEvento= async(req,res)=>{
    
        try{
            const {eventoId} = req.params
            const CursoEvento = await prisma.CursoEvento.findMany({
                where: {
                    eventoId: parseInt(eventoId),
                  },
                  select: {
                    cursoId: true,
                  },
              });
    
              const idsCursosArray = CursoEvento.map((curso) => curso.cursoId);
              res.status(200).json({ idsCursos: idsCursosArray });
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Error al obtener los IDs de los cursos' });
            }
          };
          const deleteCursoEvento = async (req, res) => {
            const { id_curso, codigo_evento } = req.params;
          
            try {
              const CursoEvento = await prisma.CursoEvento.delete({
                where: {
                    eventoId_cursoId: {  // Cambiado de cursoId_eventoId a eventoId_cursoId
                        cursoId: Number(id_curso),
                    eventoId: Number(codigo_evento),
                  },
                },
              });
          
              if (!CursoEvento) {
                return res.status(404).json({
                  mensaje: "No se encontró la relación entre el curso y el evento.",
                });
              }
          
              return res.status(200).json({
                mensaje: "Se ha eliminado la relación exitosamente.",
                CursoEvento: CursoEvento,
              });
            } catch (error) {
              console.error(error);
              return res.status(500).json({
                mensaje: "Error interno del servidor al eliminar la relación.",
              });
            }
          };
const deleteEventos= async(req,res)=>{
    const {codigo_evento} = req.params
    try{

        const deletedCursoEventos  = await prisma.CursoEvento.deleteMany({
            where: {
                eventoId: Number(codigo_evento),
            },
          });
          if (deletedCursoEventos.count === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron relaciones para el evento proporcionado",
            });
        }

        return res.status(200).json({
            mensaje: "Se han eliminado todas las relaciones exitosamente",
            deletedCursoEventos: deletedCursoEventos,
        });
    }catch (error) {
        console.error(error.stack);
        return res.status(500).json({
            mensaje: "Error al intentar eliminar las relaciones del evento con los cursos",
        });
    }
};




module.exports={
getCursosEventos,
createCursoEvento,
getCursoEvento,
deleteCursoEvento,
getEventosporCurso,
deleteEventos,
getCursosporEvento
}