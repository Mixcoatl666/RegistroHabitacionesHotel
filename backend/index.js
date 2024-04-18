import 'dotenv/config';
import express from 'express';
import conexionDB from './config/database.js';
import cors from 'cors';

import empleadoRoutes from './routes/empleadoRoutes.js';
import revisionRoutes from './routes/revisionRoutes.js';
import habitacionRoutes from './routes/habitacionRoutes.js';

const APP = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL

// Conexión a MongoDB
conexionDB();

APP.use(express.json());
APP.use(cors({
    origin: 'http://localhost:4200'
}));

APP.get('/', (req, res) => {
    res.send('Hola Mundo');
})

APP.use('/api/empleados', empleadoRoutes);
APP.use('/api/revision', revisionRoutes);
APP.use('/api/habitacion', habitacionRoutes);

APP.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

APP.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});
