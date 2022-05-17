const { Mensaje } = require('../models/index');
const MensajeController = {};

// Función de mostrar todos los Mensajes.
MensajeController.verMensajes = async (req, res) => {
    try {
        const mensajes = await Mensaje.findAll();
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar los Mensajes',
            error
        });
    }
};

// Función de ver un Mensaje por ID.
MensajeController.verMensajeId = async (req, res) => {
    try {
        const mensaje = await Mensaje.findByPk(req.params.id);
        res.send(mensaje);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar el Mensaje',
        });
    }
};

// Función de ver todos los Mensajes de una comunidad.
MensajeController.verMensajesComunidadId = async (req, res) => {
    try {
        const mensajes = await Mensaje.findAll({
            where: {
                comunidad_id: req.params.id
            }
        });
        res.send(mensajes);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar los Mensajes',
        });
    }
};

// Función de crear un Mensaje sin validación.
MensajeController.crearMensaje = async (req, res) => {
    try {
        const { comunidad_id, usuario_id, nick, mensaje, fecha, hora } = req.body;
        const nuevoMensaje = await Mensaje.create({
            comunidad_id,
            usuario_id,
            nick,
            mensaje,
            fecha,
            hora
        });
        res.send({
            message: `El Mensaje de ${nuevoMensaje.nick} a sido realizado.`,
            nuevoMensaje
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al crear el Mensaje',
        });
    }
};

// Función de modificar un Mensaje de un Miembro a una comunidad.
MensajeController.modificarMensajeId = async (req, res) => {
    try {
        const { comunidad_id, usuario_id, nick, mensaje, fecha, hora } = req.body;
        const nuevoMensaje = await Mensaje.findByPk(req.params.id);
        if (!nuevoMensaje) {
            return res.status(400).send({
                message: 'El Mensaje no existe.'
            });
        }
        const mensajeModificado = await nuevoMensaje.update({
            comunidad_id: comunidad_id,
            usuario_id: usuario_id,
            nick: nick,
            mensaje: mensaje,
            fecha: fecha,
            hora: hora
        });
        res.send(mensajeModificado);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al modificar el Mensaje',
        });
    }
};

// Función de eliminar un Mensaje por ID.
MensajeController.borrarMensajeId = async (req, res) => {
    try {
        const mensaje = await Mensaje.findByPk(req.params.id);
        if (!mensaje) {
            return res.status(400).send({
                message: 'El Mensaje no existe.'
            });
        }
        await mensaje.destroy();
        res.send({
            message: 'El Mensaje ha sido eliminado.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar el Mensaje',
        });
    }
};

// Función de eliminar todos los Mensajes.
MensajeController.borrarMensajes = async (req, res) => {
    try {
        const mensajes = await Mensaje.destroy({
            where: {},
        });
        res.send({
            message: `${mensajes} Mensajes han sido eliminados.`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar los Mensajes',
        });
    }
};

module.exports = MensajeController;