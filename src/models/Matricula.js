import {Schema, model, mongoose} from 'mongoose'
const matriculaSchema = new Schema({
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
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Estudiante',
        required: true
    },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Materia',
        required: true
    }
    }, {
    timestamps: true 
});

export default model('Matricula',matriculaSchema)