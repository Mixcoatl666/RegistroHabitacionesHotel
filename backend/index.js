import 'dotenv/config';
import express from 'express';
import conexionDB from './config/database.js';

const APP = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
conexionDB();

APP.get('/', (req, res) => {
    res.send('Hola Mundo');
})

APP.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})