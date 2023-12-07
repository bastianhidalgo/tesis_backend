const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getApoderados= async(req,res)=>{
    try{
        const apoderados =  await prisma.Apoderado.findMany() // select * from visitas

        if(apoderados.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de apoderados"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            apoderados:apoderados,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de apoderados"

        })
    }

}

const createApoderado= async(req,res)=>{

    const {rut,nombre,apellido,telefono} = req.body;
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
        if(!useRegexTelefono(req.body.telefono)){
            return res.status(406).json({
                message: 'telefono invalido'
          });
        }
        const apoderado = await prisma.Apoderado.create({
            data:{
                rut,nombre,apellido,telefono
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado el apoderado correctamente",
            apoderado:apoderado

        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al crear el apoderado"
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
        const apoderado = await prisma.Apoderado.findMany({
            where : {rut: String(rut)}
    })   
     if(!useRegexRut(req.params.rut)){
        return res.status(406).json({
            message: 'Rut invalido'
      });
    }
    if (apoderado.length === 0) { // Verificamos si el array de visitas está vacío
        return res.status(400).json({
          mensaje: "No se pudo encontrar al apoderado",
        });
      }
    return res.status(200).json({
        mensaje:"Persona admitida",
        apoderado:apoderado
    })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar al apoderado"
    })


}
}
const deleteApoderado= async(req,res)=>{
    const {id} = req.params
    try{
        const apoderado = await prisma.Apoderado.delete({
            where : {id_apoderado: Number(id)}
        })
        if(!apoderado){
            return res.status(400).json({
                mensaje:"No se pudo encontrar al apoderado"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado el alumno exitosamente",
            apoderado:apoderado
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar al apoderado"
        })
    }
};

const getApoderado= async(req,res)=>{
    const {id} = req.params
    try{

        const apoderado = await prisma.Apoderado.findUnique({
            where : {id_apoderado: Number(id)}
        })
        if (!alumno) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar al apoderado",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado al apoderado",
            apoderado:apoderado
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el apoderado"
        })
    }
};

const updateApoderado = async(req,res)=>{
    const {id}=req.params
    const {rut,nombre,apellido,telefono} = req.body
    try{

    const apoderado =await prisma.Apoderado.update({
       
    where:{id_apoderado: Number(id)},
    data:{
        rut:rut,
        nombre:nombre,
        apellido:apellido,
        telefono:telefono
    }
    }) 
       if(!apoderado){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado al apoderado",
        apoderado:apoderado
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar al apoderado"
        })
    }
}



module.exports={
getApoderados,
createApoderado,
deleteApoderado,
getApoderado,
updateApoderado,
compararRut,

}