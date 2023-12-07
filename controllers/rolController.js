const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getRoles= async(req,res)=>{
    try{
        const roles =  await prisma.Rol.findMany() // select * from visitas

        if(roles.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de visitas"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            roles:roles,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de visitas"

        })
    }

}

const createRol= async(req,res)=>{

    const {descripcion} = req.body;
    try{


        const rol = await prisma.Rol.create({
            data:{
                descripcion
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el rol correctamente",
            rol:rol

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el rol"
        })
    }
}

const deleteRol= async(req,res)=>{
    const {codigo} = req.params
    try{
        const rol = await prisma.Rol.delete({
            where : {codigo_rol: Number(codigo)}
        })
        if(!rol){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a la visita"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado la visita exitosamente",
            rol:rol
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la visita"
        })
    }
};

const getRol= async(req,res)=>{
    const {codigo} = req.params
    try{

        const rol = await prisma.Rol.findUnique({
            where : {codigo_rol: Number(codigo)}
        })
        if (!rol) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar el rol",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado el rol",
            rol:rol
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el rol"
        })
    }
};

const updateRol = async(req,res)=>{
    const {codigo}=req.params
    const {descripcion} = req.body
    try{

    const rol =await prisma.Rol.update({
       
    where:{codigo_rol: Number(codigo)},
    data:{
        
        descripcion:descripcion
    }
    }) 
       if(!rol){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado el rol",
        rol:rol
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar el rol"
        })
    }
}




module.exports={
getRoles,
createRol,
deleteRol,
getRol,
updateRol
}