import mongoose from 'mongoose';

const revisionEsquema = new mongoose.Schema({
    // Numero Habitacion
    // Piso Habitacion
    habitacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true },
    nombreMucama: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    itemsRevisados: [{
        nombre: { type: String, required: true },
        // Si no
        cantidadEncontrada: { type: Number, default: 0 },
        cantidadTotal: { type: Number, required: true },
        estado: { type: String, enum: ['excelente', 'regular', 'malo', 'no encontrado'], required: true },
        comentario: { type: String, default: '' }
    }],
    // Elementos frigobar y manejar esto separado de lo demas
    estadoGeneral: { type: String, required: true },
});

const Revision = mongoose.model("Revision", revisionEsquema);
export default Revision;