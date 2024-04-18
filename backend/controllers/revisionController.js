// controllers/RevisionController.js
import Revision from '../models/Revision.js';

export const iniciarRevision = async (req, res) => {
    try {
        const { habitacionId } = req.params;
        const habitacion = await Habitacion.findById(habitacionId);
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        const itemsRevisados = [];
        if (habitacion.caracteristicas.sabanas) {
            itemsRevisados.push({
                nombre: 'Sabanas',
                cantidadTotal: habitacion.caracteristicas.sabanas.cantidad,
                estado: habitacion.caracteristicas.sabanas.estado,
                comentario: ''
            });
        }
        if (habitacion.caracteristicas.toallas) {
            itemsRevisados.push({
                nombre: 'Toallas',
                cantidadTotal: habitacion.caracteristicas.toallas.cantidad,
                estado: habitacion.caracteristicas.toallas.estado,
                comentario: ''
            });
        }
        habitacion.caracteristicas.frigobar.forEach(item => {
            itemsRevisados.push({
                nombre: item.item,
                cantidadTotal: item.cantidad,
                estado: 'no encontrado',
                comentario: ''
            });
        });

        const nuevaRevision = new Revision({
            habitacionId,
            nombreMucama: req.body.nombreMucama,
            itemsRevisados,
            estadoGeneral: 'Pendiente',
            notificacion: false
        });

        const revisionGuardada = await nuevaRevision.save();
        res.status(201).json(revisionGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const finalizarRevision = async (req, res) => {
    try {
        const { revisionId } = req.params;
        const revision = await Revision.findById(revisionId);
        if (!revision) {
            return res.status(404).json({ message: "Revisión no iniciada o no existe" });
        }

        const habitacion = await Habitacion.findById(revision.habitacionId);
        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        revision.itemsRevisados.forEach(itemRevisado => {
            const itemHabitacion = habitacion.caracteristicas.frigobar.find(item => item.item === itemRevisado.nombre);
            if (itemHabitacion) {
                itemHabitacion.cantidad = itemRevisado.cantidadEncontrada;
            } else {
                if (itemRevisado.nombre === 'Sabanas') {
                    habitacion.caracteristicas.sabanas.cantidad = itemRevisado.cantidadEncontrada;
                    habitacion.caracteristicas.sabanas.estado = itemRevisado.estado;
                } else if (itemRevisado.nombre === 'Toallas') {
                    habitacion.caracteristicas.toallas.cantidad = itemRevisado.cantidadEncontrada;
                    habitacion.caracteristicas.toallas.estado = itemRevisado.estado;
                }
            }
        });

        await habitacion.save();

        habitacion.estado = 'lista';
        await habitacion.save();

        res.status(200).json({ message: "Revisión completada y habitación actualizada", habitacion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filtrar revisiones con múltiples criterios
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
        res.status(400).json({ message: error.message });
    }
};
