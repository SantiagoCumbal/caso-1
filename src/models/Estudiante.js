import {Schema, model} from 'mongoose'
import Matricula from './Matricula.js' 

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: false,
        trim: true
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fecha_nacimiento: {
        type: Date,
        required: false
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
    }, {
    timestamps: true 
});

estudianteSchema.pre('findOneAndDelete', async function(next) {
    const estudiante = await this.model.findOne(this.getFilter());
    if (estudiante) {
        await Matricula.deleteMany({ id_estudiante: estudiante._id });
    }
    next();
});

export default model('Estudiante',estudianteSchema)