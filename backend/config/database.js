import mongoose from 'mongoose';

const conexionDB = async () => {
    try {
        // Creando la conexión
        const conection = await mongoose.connect(process.env.MONGO_URI);
        // Mensaje de status
        let url = `${conection.connection.host}:${conection.connection.port}`;
        console.log(`Se conectó a MongoDB en: ${url}`);
    } catch (error) {
        console.log(`error: ${error}`);
        process.exit(1);
    }
};

export default conexionDB;
