import express from 'express';
import { getAllEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    registerEmpleado,
    loginEmpleado
} from '../controllers/empleadoController.js';

const router = express.Router();

router.route('/')
    .get(getAllEmpleados)
    .post(createEmpleado);

router.route('/:id')
    .get(getEmpleado)
    .put(updateEmpleado)
    .delete(deleteEmpleado);

router.post('/register', registerEmpleado);
router.post('/login', loginEmpleado);

export default router;