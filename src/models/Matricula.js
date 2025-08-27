import {Schema, model, mongoose} from 'mongoose'
const matriculaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    id_estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Estudiante',
        required: true
    },
    id_materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Materia',
        required: true
    }
    }, {
    timestamps: true 
});

export default model('Matricula',matriculaSchema)