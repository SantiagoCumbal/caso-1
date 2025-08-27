import {Schema, model} from 'mongoose'
import Matricula from './Matricula.js' 

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    creditos: {
        type: Number,
        required: true,
        trim: true
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