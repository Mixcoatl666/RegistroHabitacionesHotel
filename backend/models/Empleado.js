import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const empleadoEsquema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    contrasenia: { type: String, required: true, trim: true },
    rol: { type: String, enum: ['mucama', 'recepcionista'], required: true },
    token: { type: String, required: false, trim: true }
});

// Middleware para hashear la contraseña antes de guardarla
empleadoEsquema.pre('save', async function (next) {
    if (!this.isModified('contrasenia')) {
        return next();
    }
    this.contrasenia = await bcrypt.hash(this.contrasenia, 8);
    next();
});

const Empleado = mongoose.model("Empleado", empleadoEsquema);
export default Empleado;