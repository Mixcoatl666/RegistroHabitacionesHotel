import mongoose from 'mongoose';

const habitacionSchema = new mongoose.Schema({
    piso: { type: Number, required: true },
    numeroHabitacion: { type: Number, required: true },
    nombreMucama: { type: String, required: true },
    clienteHospedado: { type: String, required: false },
    caracteristicas: {
        sabanas: {
            estado: { type: String, enum: ['excelente', 'regular', 'malo'], required: true },
            cantidad: { type: Number, required: true }
        },
        toallas: {
            estado: { type: String, enum: ['excelente', 'regular', 'malo'], required: true },
            cantidad: { type: Number, required: true }
        },
        frigobar: [{
            item: { type: String, required: true },
            cantidad: { type: Number, required: true }
        }]
    },
    estadoHabitacion: { type: String, enum: ['libre', 'ocupada', 'revisando'], required: true }
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);
export default Habitacion;
