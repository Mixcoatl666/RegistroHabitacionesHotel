import express from 'express';
import { iniciarRevision, finalizarRevision, filtrarRevisiones, getRevisionesPorMucama } from '../controllers/revisionController.js';

const router = express.Router();

router.post('/iniciar/:habitacionId', iniciarRevision);
router.post('/finalizar/:revisionId', finalizarRevision);
router.get('/', filtrarRevisiones);

// Añade esta ruta en tu archivo de rutas de revisiones
router.get('/nMucama', getRevisionesPorMucama);


export default router;