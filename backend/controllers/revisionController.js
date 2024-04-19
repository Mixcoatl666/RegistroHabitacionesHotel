import Revision from '../models/Revision.js';
import Habitacion from '../models/Habitaciones.js'; // Asegúrate que el nombre del modelo es correcto

export const iniciarRevision = async (req, res) => {
    try {
        const { habitacionId } = req.params;
        const habitacion = await Habitacion.findById(habitacionId);
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        // Crear la estructura de revisión según el nuevo modelo
        const nuevaRevision = new Revision({
            numeroHabitacion: habitacion.numeroHabitacion,
            pisoHabitacion: habitacion.piso,
            nombreMucama: req.body.nombreMucama,
            itemsRevisados: [
                {
                    nombre: 'Sabanas',
                    cantidadTotal: habitacion.caracteristicas.sabanas.cantidad,
                    estado: 'no encontrado', // Estado inicial
                },
                {
                    nombre: 'Toallas',
                    cantidadTotal: habitacion.caracteristicas.toallas.cantidad,
                    estado: 'no encontrado', // Estado inicial
                }
            ],
            frigobarItems: habitacion.caracteristicas.frigobar.map(item => ({
                item: item.item,
                cantidadTotal: item.cantidad,
                estado: 'no encontrado' // Estado inicial
            })),
            estadoGeneral: 'Pendiente'
        });

        await nuevaRevision.save();
        res.status(201).json(nuevaRevision);
    } catch (error) {
        res.status(400).json({ message: "Error iniciando la revisión: " + error.message });
    }
};

export const finalizarRevision = async (req, res) => {
    try {
        const { revisionId } = req.params;
        const revision = await Revision.findById(revisionId);
        if (!revision) {
            return res.status(404).json({ message: "Revisión no encontrada" });
        }

        // Buscar la habitación basada en el número de habitación y piso guardados en la revisión
        const habitacion = await Habitacion.findOne({
            numeroHabitacion: revision.numeroHabitacion,
            piso: revision.pisoHabitacion
        });
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        // Actualizar los items revisados y los del frigobar
        revision.itemsRevisados.forEach(item => {
            const data = req.body.itemsRevisados.find(i => i.nombre === item.nombre);
            if (data) {
                item.estado = data.estado;
                item.cantidadEncontrada = data.cantidadEncontrada;
                item.comentario = data.comentario;

                // Actualizar habitación
                if (item.nombre === 'Sabanas') {
                    habitacion.caracteristicas.sabanas.estado = data.estado;
                    habitacion.caracteristicas.sabanas.cantidad = data.cantidadEncontrada;
                } else if (item.nombre === 'Toallas') {
                    habitacion.caracteristicas.toallas.estado = data.estado;
                    habitacion.caracteristicas.toallas.cantidad = data.cantidadEncontrada;
                }
            }
        });

        revision.frigobarItems.forEach(item => {
            const data = req.body.frigobarItems.find(i => i.item === item.item);
            if (data) {
                item.cantidadEncontrada = data.cantidadEncontrada;
                item.comentario = data.comentario;
                const frigoItem = habitacion.caracteristicas.frigobar.find(frigo => frigo.item === item.item);
                if (frigoItem) {
                    frigoItem.cantidad = data.cantidadEncontrada;
                }
            }
        });

        revision.estadoGeneral = 'Completada'; // Marcar la revisión como completada
        await revision.save();

        habitacion.estadoHabitacion = 'libre'; // Cambiar el estado de la habitación a lista
        habitacion.clienteHospedado = '';
        await habitacion.save();

        res.status(200).json({ message: "Revisión finalizada y habitación actualizada", revision, habitacion });
    } catch (error) {
        res.status(500).json({ message: "Error finalizando la revisión: " + error.message });
    }
};

export const getRevisionesPorMucama = async (req, res) => {
    try {
        const { nombreMucama } = req.query;  // Obtiene el nombre de la mucama del query
        const revisiones = await Revision.find({ nombreMucama: nombreMucama });
        res.status(200).json(revisiones);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener revisiones: " + error.message });
    }
};

export const filtrarRevisiones = async (req, res) => {
    try {
        const { nombreMucama, fechaInicio, fechaFin } = req.query;
        let filtro = {};

        if (nombreMucama) filtro.nombreMucama = nombreMucama;
        if (fechaInicio && fechaFin) {
            filtro.fecha = { '$gte': new Date(fechaInicio), '$lte': new Date(fechaFin) };
        }

        const revisiones = await Revision.find(filtro);
        res.status(200).json(revisiones);
    } catch (error) {
        res.status(400).json({ message: "Error filtrando revisiones: " + error.message });
    }
};