import Habitacion from '../models/Habitaciones.js';

export const getAllHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find();
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findById(id);
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.status(200).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: "No existe" });
    }
};

export const createHabitacion = async (req, res) => {
    try {
        const newHabitacion = new Habitacion(req.body);
        await newHabitacion.save();
        res.status(201).json(newHabitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.status(200).json(habitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findByIdAndDelete(id);
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.status(200).json({ message: "Habitación eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

