import express from 'express';
import { iniciarRevision, finalizarRevision, filtrarRevisiones } from '../controllers/revisionController.js';

const router = express.Router();

router.post('/iniciar/:habitacionId', iniciarRevision);
router.post('/finalizar/:revisionId', finalizarRevision);
router.get('/', filtrarRevisiones);

export default router;