const { useRegexNombre,useRegexTelefono, useRegexRut } = require('../utils/util');
const Rut=require('rut.js')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getIngresos= async(req,res)=>{
    try{
        const ingresos =  await prisma.Ingreso.findMany() // select * from ingreso

        if(ingresos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de ingresos"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            ingresos:ingresos,
        })

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            mensaje:"Error al obtener el listado de ingresos"

        })
    }

}

const createIngreso= async(req,res)=>{
    
    const {fechaIngreso,visitaId} = req.body;
    try{

        const ingreso = await prisma.Ingreso.create({
            data:{
                fechaIngreso,      visita: {
                    connect: {
                      id_visita: visitaId // Suponiendo que visitaId es el ID del objeto Visita relacionado
                    }
                  }
            }
        })
        return res.status(200).json({
            mensaje:"Se ha creado la visita correctamente",
            ingreso:ingreso

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
const deleteIngreso= async(req,res)=>{
    const {id} = req.params
    try{
        const ingreso = await prisma.Ingreso.delete({
            where : {id_ingreso: Number(id)}
        })
        if(!ingreso){
            return res.status(400).json({
                mensaje:"No se pudo encontrar a la visita"
            })
        }

        return res.status(200).json({
            mensaje:"Se ha eliminado la visita exitosamente",
            ingreso:ingreso
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"No se pudo encontrar a la visita"
        })
    }
};

const getIngreso= async(req,res)=>{
    const {id} = req.params
    try{

        const ingreso = await prisma.Ingreso.findUnique({
            where : {id_ingreso: Number(id)}
        })
        if (!ingreso) { 
            return res.status(400).json({
              mensaje: "No se pudo encontrar a el ingreso",
            });
          }
        return res.status(200).json({
            mensaje:"Se ha encontrado a el ingreso",
            ingreso:ingreso
        })
    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al encontrar el ingreso"
        })
    }
};

const updateIngreso = async(req,res)=>{
    const {id}=req.params
    const {fechaIngreso,rut,nombre,apellido,telefono,rol,fechaInicio,fechaTermino} = req.body
    try{

    const ingreso =await prisma.Ingreso.update({
       
    where:{id_ingreso: Number(id)},
    data:{
        fechaIngreso:fechaIngreso,
        rut:rut,
        nombre:nombre,
        apellido:apellido,
        telefono:telefono,
        rol:rol,
        fechaInicio:fechaInicio,
        fechaTermino:fechaTermino
    }
    }) 
       if(!ingreso){
        return res.status(400).json({
            mensaje:"Error al actualizar"
        });
    }
    return res.status(200).json({
        mensaje:"Se ha actualizado a la visita",
        ingreso:ingreso
    })


    }catch(error)
    {
        console.log(error.stack);
        return res.status(400).json({
            mensaje:"Error al actualizar a la visita"
        })
    }
}


module.exports={
getIngresos,
createIngreso,
deleteIngreso,
getIngreso,
updateIngreso,
compararRut
}