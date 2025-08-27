import {Schema, model} from 'mongoose'
import Matricula from './Matricula.js' 

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El nombre no puede superar 20 caracteres']
    },
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [20, 'El codigo no puede superar 20 caracteres']
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La descripcion no puede superar 50 caracteres']
    },
    creditos: {
        type: Number,
        required: true,
        trim: true,
        min: [1, 'Debe tener al menos 1 crédito'],
        max: [15, 'No puede superar los 15 créditos']
    }
    }, {
    timestamps: true 
});

materiaSchema.pre('findOneAndDelete', async function(next) {
    const materia = await this.model.findOne(this.getFilter());
    if (materia) {
        await Matricula.deleteMany({ id_materia: materia._id });
    }
    next();
});

export default model('Materia',materiaSchema)