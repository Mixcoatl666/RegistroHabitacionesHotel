import Habitacion from '../models/Habitaciones.js';
import Empleado from '../models/Empleado.js';
import { iniciarRevision } from './revisionController.js';


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

export const actualizarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findById(id);
        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        // Guardar estado actual antes de la actualización para comparar después
        const estadoAnterior = habitacion.estadoHabitacion;

        // Actualizar habitación
        const actualizacion = req.body;
        Object.assign(habitacion, actualizacion);
        await habitacion.save();

        // Verificar si el estado ha cambiado a "revisando"
        if (estadoAnterior !== 'revisando' && habitacion.estadoHabitacion === 'revisando') {
            // Función para iniciar revisión automáticamente
            await iniciarRevisionAutomatica(habitacion._id, habitacion.nombreMucama);
        }

        // Verificar si el estado ha cambiado a "libre"
        if (estadoAnterior !== 'libre' && habitacion.estadoHabitacion === 'libre') {
            // Función para limpiar datos de la habitación cuando está lista
            limpiarDatosHabitacion(habitacion);
            await habitacion.save(); // Guardar los cambios limpiados
        }

        res.status(200).json(habitacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Asegúrate de que esta función realmente llame e inicie la revisión correctamente
async function iniciarRevisionAutomatica(habitacionId, nombreMucama) {
    try {
        // Esta es una simulación de lo que debería ser un request object correcto para tu función iniciarRevision
        const fakeReq = {
            params: { habitacionId },
            body: { nombreMucama }
        };
        const fakeRes = {
            status: (statusCode) => ({
                json: (data) => console.log(`Revisión iniciada: ${JSON.stringify(data)}`)
            })
        };
        await iniciarRevision(fakeReq, fakeRes); // Asumiendo que iniciarRevision maneja estos objetos correctamente
    } catch (error) {
        console.error('Error al iniciar revisión automática:', error);
    }
}

function limpiarDatosHabitacion(habitacion) {
    habitacion.clienteHospedado = ''; // Limpiar datos del cliente
    console.log('Preparando habitación para nuevo cliente:', habitacion._id);
}

// Función combinada para obtener habitaciones con o sin filtros
export const obtenerHabitaciones = async (req, res) => {
    try {
        const query = req.query;
        let filtro = {};

        if (query.estadoHabitacion) filtro.estadoHabitacion = query.estadoHabitacion;
        if (query.piso) filtro.piso = query.piso;
        if (query.nombreMucama) filtro.nombreMucama = query.nombreMucama;
        if (query.numeroHabitacion) filtro.numeroHabitacion = query.numeroHabitacion;

        console.log('Aplicando filtros:', filtro); // Ver los filtros aplicados

        const habitaciones = await Habitacion.find(filtro);
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(400).json({ message: 'Error al recuperar las habitaciones: ' + error.message });
    }
};