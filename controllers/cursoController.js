const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getCursos= async(req,res)=>{
    try{
        const cursos =  await prisma.Curso.findMany() // select * from visitas

        if(cursos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de cursos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            cursos:cursos,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de cursos"

        })
    }

}

const createCurso= async(req,res)=>{

    const {nombre,descripcion} = req.body;
    try{


        const curso = await prisma.Curso.create({
            data:{
                nombre,descripcion
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el curso correctamente",
            curso:curso

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el curso"
        })
    }
}

const deleteCurso= async(req,res)=>{
    const {id} = req.params
    try{
        const curso = await prisma.Curso.delete({
            where : {id_curso: Number(id)}
        })
        if(!curso){
            return res.status(400).json({
                mensaje:"No se pudo encontrar al curso"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el curso exitosamente",
            curso:curso
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar al curso"
        })
    }
};

const getCurso= async(req,res)=>{
    const {id} = req.params
    try{

        const curso = await prisma.Curso.findUnique({
            where : {id_curso: Number(id)}
        })
        if (!curso) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar el curso",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado el curso",
            curso:curso
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el curso"
        })
    }
};

const updateCurso = async(req,res)=>{
    const {id}=req.params
    const {nombre,descripcion} = req.body
    try{

    const curso =await prisma.Curso.update({
       
    where:{id_curso: Number(id)},
    data:{
        nombre:nombre,
        descripcion:descripcion
    }
    }) 
       if(!curso){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado el curso",
        curso:curso
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar el curso"
        })
    }
}




module.exports={
getCursos,
createCurso,
deleteCurso,
getCurso,
updateCurso
}