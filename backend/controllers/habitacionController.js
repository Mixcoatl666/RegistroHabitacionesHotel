import Habitacion from '../models/Habitaciones.js';
import Empleado from '../models/Empleado.js';

// Crear una nueva habitación
export const crearHabitacion = async (req, res) => {
    try {
        const { nombreMucama, piso } = req.body;

        // Verificar si la mucama existe
        const mucama = await Empleado.findOne({ nombre: nombreMucama });
        if (!mucama) {
            return res.status(404).json({ message: 'Mucama no encontrada' });
        }

        // Verificar si la mucama ya está asignada a un piso diferente
        const habitacionExistente = await Habitacion.findOne({ nombreMucama, piso: { $ne: piso } });
        if (habitacionExistente) {
            return res.status(400).json({ message: 'La mucama ya está asignada a otro piso' });
        }

        const nuevaHabitacion = new Habitacion(req.body);
        const habitacionGuardada = await nuevaHabitacion.save();
        res.status(201).json(habitacionGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una habitación por ID
export const actualizarHabitacion = async (req, res) => {
    try {
        const habitacionActualizada = await Habitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habitacionActualizada) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.status(200).json(habitacionActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Función combinada para obtener habitaciones con o sin filtros
export const obtenerHabitaciones = async (req, res) => {
    try {
        const query = req.query;
        let filtro = {};

        if (query.estado) filtro.estadoHabitacion = query.estado;
        if (query.piso) filtro.piso = query.piso;
        if (query.nombreMucama) filtro.nombreMucama = query.nombreMucama;
        if (query.fechaInicio && query.fechaFin) filtro['$and'] = [
            { 'caracteristicas.fecha': { '$gte': new Date(query.fechaInicio) } },
            { 'caracteristicas.fecha': { '$lte': new Date(query.fechaFin) } }
        ];

        const habitaciones = await Habitacion.find(filtro);
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(400).json({ message: 'Error al recuperar las habitaciones: ' + error.message });
    }
};