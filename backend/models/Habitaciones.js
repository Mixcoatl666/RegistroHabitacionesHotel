import mongoose from 'mongoose';

const habitacionSchema = new mongoose.Schema({
    piso: { type: Number, required: true },
    numero: { type: Number, required: true, unique: true },
    tipo: { type: String, enum: ['economico', 'estandar', 'premium'], required: true },
    estado: { type: String, enum: ['ocupada', 'revisando', 'lista'], required: true }
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);

export default Habitacion;