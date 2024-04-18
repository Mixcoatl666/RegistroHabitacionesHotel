import mongoose from 'mongoose';

const revisonEsquema = new mongoose.Schema({
    numeroHabitacion: {
        type: Number,  // Asumiendo que el número de habitación es un número único
        required: true
    },
    nombreMucama: {
        type: String,  // Usar el nombre directo de la mucama
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    itemsRevisados: [{
        nombre: { type: String, required: true },
        estado: { type: String, enum: ['excelente', 'regular', 'malo', 'no encontrado'], required: true },
        comentario: { type: String }
    }],
    estadoGeneral: {
        type: String,
        required: true
    },
    notificacion: {
        type: Boolean,
        required: true
    }
});

const Revision = mongoose.model("Revision", revisonEsquema);
export default Revision;
