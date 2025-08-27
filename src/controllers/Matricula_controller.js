import Matricula from "../models/Matricula.js"
import mongoose from "mongoose"
import Estudiante from "../models/Estudiante.js"
import Materia from "../models/Materia.js"

const registroMatricula = async (req,res)=>{
    try {
            const { codigo, descripcion, id_estudiante, id_materia } = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        
        const codigoExistente = await Matricula.findOne({ codigo });
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso para otra matricula` }
        )

        const estudianteExiste = await Estudiante.findById(id_estudiante);
        if (!estudianteExiste) return res.status(400).json(
            { msg: "El estudiante no existe" }
        )
        
        const materiaExistente = await Materia.findById(id_materia);
        if (!materiaExistente) return res.status(400).json(
            { msg: "La materia no existe" }
        )
        
        const nuevaMatricula = new Matricula({
            ...req.body,
            estudiante: id_estudiante,
            materia: id_materia
        })
        await nuevaMatricula.save()
        res.status(200).json({nuevaMatricula})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const visualizarMatriculas = async (req,res)=>{
    const matriculas = await Matricula.find().select(" -createdAt -updatedAt -__v").populate('id_estudiante',' nombre apellido cedula').populate('id_materia','nombre codigo creditos')
    res.status(200).json(matriculas)
}

const detalleMatricula = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const matriculaBDD = await Matricula.findById(id)
    if(!matriculaBDD) return res.status(404).json(
        {msg:`No existe una matricula con el siguiente id: ${id}`}
    )
    const matricula = await Matricula.findById(id).select("-createdAt -updatedAt -__v").populate('id_estudiante',' nombre apellido cedula').populate('id_materia','nombre codigo creditos')
    res.status(200).json(matricula)
}

const actualizarMatricula = async (req,res)=>{
    try {
            const {id} = req.params
        const {codigo, descripcion, id_estudiante, id_materia} = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const matriculaBDD = await Matricula.findById(id)
        if(!matriculaBDD) return res.status(404).json(
            {msg:`No existe una matricula con el siguiente id: ${id}`}
        )
        const codigoExistente = await Matricula.findOne({ codigo, _id: { $ne: id } })
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso por otra matricula` }
        )
        const estudianteExiste = await Estudiante.findById(id_estudiante);
        if (!estudianteExiste) return res.status(400).json(
            { msg: "El estudiante no existe" }
        )
        
        const materiaExistente = await Materia.findById(id_materia);
        if (!materiaExistente) return res.status(400).json(
            { msg: "La materia no existe" }
        )
        

        matriculaBDD.codigo = codigo ?? matriculaBDD.codigo
        matriculaBDD.descripcion = descripcion ?? matriculaBDD.descripcion
        matriculaBDD.id_estudiante = id_estudiante ?? matriculaBDD.id_estudiante
        matriculaBDD.id_materia = id_materia ?? matriculaBDD.id_materia
        await matriculaBDD.save()

        res.status(200).json(matriculaBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const eliminarMatricula = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const matriculaBDD = await Matricula.findById(id)
    if(!matriculaBDD) return res.status(404).json(
        {msg:`No existe una matricula con el siguiente id: ${id}`}
    )
    await Matricula.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Matricula eliminada exitosamente"})
}



export {
    registroMatricula,
    visualizarMatriculas,
    detalleMatricula,
    actualizarMatricula,
    eliminarMatricula
}