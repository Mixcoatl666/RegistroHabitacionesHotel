import 'dotenv/config';
import express from 'express';
import conexionDB from './config/database.js';

import habitacionRoutes from './routes/habitacionRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js'

const APP = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
conexionDB();

APP.use(express.json());

APP.get('/', (req, res) => {
    res.send('Hola Mundo');
})

APP.use('/api/habitaciones', habitacionRoutes);
APP.use('/api/empleados', empleadoRoutes);

APP.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

APP.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});
