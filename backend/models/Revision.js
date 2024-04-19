import mongoose from 'mongoose';

const revisionEsquema = new mongoose.Schema({
    // Comentario 1 y 2: Poner nombre y piso de la habitación, quitar el habitacionId
    numeroHabitacion: { type: Number, required: true },
    pisoHabitacion: { type: Number, required: true },
    nombreMucama: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    itemsRevisados: [{
        // Comentario 3: En items revisados solo se revisan las toallas y las sabanas
        nombre: { type: String, required: true },
        cantidadEncontrada: { type: Number, default: 0 },
        cantidadTotal: { type: Number, required: true },
        estado: { type: String, enum: ['excelente', 'regular', 'malo', 'no encontrado'], required: true },
        comentario: { type: String, default: '' }
    }],
    frigobarItems: [{ // Comentario 4: Los elementos del frigobar se diferencian
        item: { type: String, required: true },
        cantidadEncontrada: { type: Number, default: 0 },
        cantidadTotal: { type: Number, required: true },
        comentario: { type: String, default: '' }
    }],
    estadoGeneral: { type: String, required: true }
});

const Revision = mongoose.model("Revision", revisionEsquema);
export default Revision;