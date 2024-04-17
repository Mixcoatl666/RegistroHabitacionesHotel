import mongoose from 'mongoose';

// Esquema
const empleadoEsquema = mongoose.Schema({
    nombre: {type:String, required:true, trim:true},
    contrasenia:{type:String, required:true, trim:true},
    rol:{type:String},
    token:{type:String, required:true, trim:true}
});

const empleado = mongoose.model("empleado", empleadoEsquema);
export default empleado;