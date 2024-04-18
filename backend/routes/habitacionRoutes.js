import express from 'express';
import { getAllHabitaciones, getHabitacion, createHabitacion, updateHabitacion, deleteHabitacion } from '../controllers/habitacionController.js';

const router = express.Router();

router.get('/', getAllHabitaciones);
router.get('/:id', getHabitacion);
router.post('/', createHabitacion);
router.put('/:id', updateHabitacion);
router.delete('/:id', deleteHabitacion);

export default router;