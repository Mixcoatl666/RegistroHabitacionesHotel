import express from 'express';
import { crearHabitacion, actualizarHabitacion, obtenerHabitaciones } from '../controllers/habitacionController.js';

const router = express.Router();

// Ruta para crear una nueva habitación
router.post('/', crearHabitacion);

// Ruta para actualizar una habitación existente
router.put('/:id', actualizarHabitacion);

// Ruta para obtener habitaciones con filtros
router.get('/', obtenerHabitaciones);

export default router;
