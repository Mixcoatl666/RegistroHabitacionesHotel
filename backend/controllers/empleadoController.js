import Empleado from '../models/Empleado.js';
import generarJWT from '../helpers/generarJWT.js';
import bcrypt from 'bcryptjs';

// Obtener todos los empleados
export const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un empleado por ID
export const getEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
    const { nombre, email, contrasenia, rol } = req.body;
    try {
        const nuevoEmpleado = new Empleado({
            nombre,
            email,
            contrasenia,
            rol
        });
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;
    try {
        const updatedEmpleado = await Empleado.findByIdAndUpdate(id, {
            nombre,
            email,
            rol
        }, { new: true });
        res.status(200).json(updatedEmpleado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        await Empleado.findByIdAndDelete(id);
        res.status(200).json({ message: "Empleado eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Registro de un empleado
export const registerEmpleado = async (req, res) => {
    const { nombre, email, contrasenia, rol } = req.body;
    try {
        const existeEmpleado = await Empleado.findOne({ email });
        if (existeEmpleado) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        const empleado = new Empleado({
            nombre,
            email,
            contrasenia,
            rol
        });
        await empleado.save();
        res.status(201).json({ message: "Empleado registrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login de un empleado
export const loginEmpleado = async (req, res) => {
    const { email, contrasenia } = req.body;
    try {
        const empleado = await Empleado.findOne({ email });
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        const correctPassword = await bcrypt.compare(contrasenia, empleado.contrasenia);
        if (!correctPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        const token = generarJWT(empleado.id, empleado.nombre, empleado.rol);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
