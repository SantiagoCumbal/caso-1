import Estudiante from "../models/Estudiante.js"
import mongoose from "mongoose"

const registroEstudiante = async (req,res)=>{
    try {
        const {nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const cedulaExistente = await Estudiante.findOne({ cedula });
        if (cedulaExistente) return res.status(400).json(
            { msg: `La cedula ${cedula} ya está en uso por otro estudiante` }
        )
        const nuevoEstudiante = new Estudiante(req.body)
        await nuevoEstudiante.save()
        res.status(200).json({nuevoEstudiante})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
        
}

const visualizarEstudiantes = async (req,res)=>{
    const estudiantes = await Estudiante.find().select(" -createdAt -updatedAt -__v")
    res.status(200).json(estudiantes)
}

const detalleEstudiante = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const estudianteBDD = await Estudiante.findById(id)
    if(!estudianteBDD) return res.status(404).json(
        {msg:`No existe un estudiante con el siguiente id: ${id}`}
    )
    const estudiante = await Estudiante.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(estudiante)
}

const actualizarEstudiante = async (req,res)=>{
    try {
            const {id} = req.params
        const {nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email} = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const estudianteBDD = await Estudiante.findById(id)
        if(!estudianteBDD) return res.status(404).json(
            {msg:`No existe un estudiante con el siguiente id: ${id}`}
        )
        const cedulaExistente = await Estudiante.findOne({ cedula, _id: { $ne: id } })
        if (cedulaExistente) return res.status(400).json(
            { msg: `La cedula ${cedula} ya está en uso por otro estudiante` }
        )
        

        estudianteBDD.nombre = nombre ?? estudianteBDD.nombre
        estudianteBDD.apellido = apellido ?? estudianteBDD.apellido
        estudianteBDD.cedula = cedula ?? estudianteBDD.cedula
        estudianteBDD.fecha_nacimiento = fecha_nacimiento ?? estudianteBDD.fecha_nacimiento
        estudianteBDD.ciudad = ciudad ?? estudianteBDD.ciudad
        estudianteBDD.direccion = direccion ?? estudianteBDD.direccion
        estudianteBDD.telefono = telefono ?? estudianteBDD.telefono
        estudianteBDD.email = email ?? estudianteBDD.email
        await estudianteBDD.save()

        res.status(200).json(estudianteBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    

}

const eliminarEstudiante = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const estudianteBDD = await Estudiante.findById(id)
    if(!estudianteBDD) return res.status(404).json(
        {msg:`No existe un estudiante con el siguiente id: ${id}`}
    )
    await Estudiante.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Estudiante eliminado exitosamente"})
}


export{
    registroEstudiante,
    visualizarEstudiantes,
    detalleEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}
