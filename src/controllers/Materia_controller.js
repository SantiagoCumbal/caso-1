import Materia from "../models/Materia.js"
import mongoose from "mongoose"

const registroMateria = async (req,res)=>{
    try {
        const {nombre,codigo,descripcion,creditos} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        
        const codigoExistente = await Materia.findOne({ codigo });
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso` }
        )
        
        const nuevaMateria = new Materia(req.body)
        await nuevaMateria.save()
        res.status(200).json({nuevaMateria})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
}

const visualizarMaterias = async (req,res)=>{
    const materias = await Materia.find().select(" -createdAt -updatedAt -__v")
    res.status(200).json(materias)
}

const detalleMateria = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const materiaBDD = await Materia.findById(id)
    if(!materiaBDD) return res.status(404).json(
        {msg:`No existe una materia con el siguiente id: ${id}`}
    )
    const materia = await Materia.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(materia)
}

const actualizarMateria = async (req,res)=>{
    try {
        const {id} = req.params
        const {nombre,codigo,descripcion,creditos} = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const materiaBDD = await Materia.findById(id)
        if(!materiaBDD) return res.status(404).json(
            {msg:`No existe una materia con el siguiente id: ${id}`}
        )
        const codigoExistente = await Materia.findOne({ codigo, _id: { $ne: id } })
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso por otra materia` }
        )
        

        materiaBDD.nombre = nombre ?? materiaBDD.nombre
        materiaBDD.codigo = codigo ?? materiaBDD.codigo
        materiaBDD.descripcion = descripcion ?? materiaBDD.descripcion
        materiaBDD.creditos = creditos ?? materiaBDD.creditos
        await materiaBDD.save()

        res.status(200).json(materiaBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const eliminarMateria = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const materiaBDD = await Materia.findById(id)
    if(!materiaBDD) return res.status(404).json(
        {msg:`No existe una materia con el siguiente id: ${id}`}
    )
    await Materia.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Materia eliminada exitosamente"})
}


export{
    registroMateria,
    visualizarMaterias,
    detalleMateria,
    actualizarMateria,
    eliminarMateria
}
