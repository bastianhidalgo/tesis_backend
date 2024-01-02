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

const deleteCursoEvento= async(req,res)=>{
    const {id_curso,codigo_evento} = req.params
    try{

        const CursoEvento = await prisma.CursoEvento.delete({
            where: {
              cursoId_eventoId: {
                cursoId: Number(id_curso),
                eventoId: Number(codigo_evento),
              },
            },
          });
        if(!CursoEvento){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a curso y evento"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el registro exitosamente",
            CursoEvento:CursoEvento
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar el registro"
        })
    }
};




module.exports={
getCursosEventos,
createCursoEvento,
getCursoEvento,
deleteCursoEvento,
getEventosporCurso
}