const { Mensaje } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const MensajeController = {};

// Función de mostrar todos los Mensajes.
MensajeController.verMensajes = (req, res) => {
    try {
        Mensaje.findAll()
            .then(datos => {
                res.send(datos);
            });
    } catch (err) {
        res.send(err);
    }
}

// Función de ver un Mensaje por ID.
MensajeController.verMensajeId = (req, res) => {
    try {
        Mensaje.findByPk(req.params.id)
            .then(datos => {
                res.send(datos)
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de crear un Mensaje como Miembro a una comunidad.
MensajeController.crearMensajeMiembro = (req, res) => {
    try {
        let comunidad_id = req.body.comunidad_id;
        let miembro_id = req.body.miembro_id;
        let mensaje = req.body.mensaje;
        let fecha = req.body.fecha;
        let hora = req.body.hora;
        Mensaje.create({
            comunidad_id: comunidad_id,
            miembro_id: miembro_id,
            mensaje: mensaje,
            fecha: fecha,
            hora: hora
        })
            .then(datos => {
                res.send(datos);
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de crear un Mensaje privado como Amigo.
MensajeController.crearMensajeAmigo = (req, res) => {
    try {
        let amigo_id = req.body.amigo_id;
        let mensaje = req.body.mensaje;
        let fecha = req.body.fecha;
        let hora = req.body.hora;
        Mensaje.create({
            amigo_id: amigo_id,
            mensaje: mensaje,
            fecha: fecha,
            hora: hora
        })
            .then(datos => {
                res.send(datos);
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de modificar un Mensaje de un Miembro a una comunidad.
MensajeController.modificarMensajeMiembro = (req, res) => {
    let id = req.params.id;
    let comunidad_id = req.body.comunidad_id;
    let miembro_id = req.body.miembro_id;
    let mensaje = req.body.mensaje;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    try {
        Mensaje.update({
            comunidad_id: comunidad_id,
            miembro_id: miembro_id,
            mensaje: mensaje,
            fecha: fecha,
            hora: hora
        }, {
                where: {
                    id: id,
                    comunidad_id: comunidad_id,
                    miembro_id: miembro_id
                }
            })
            .then(datos => {
                res.send(datos);
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de modificar un Mensaje privado de un Amigo.
MensajeController.modificarMensajeAmigo = (req, res) => {
    let id = req.params.id;
    let amigo_id = req.body.amigo_id;
    let mensaje = req.body.mensaje;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    try {
        Mensaje.update({
            amigo_id: amigo_id,
            mensaje: mensaje,
            fecha: fecha,
            hora: hora
        }, {
                where: {
                    id: id,
                    amigo_id: amigo_id
                }
            })
            .then(datos => {
                res.send(datos);
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar un Mensaje de un Miembro a una comunidad.
MensajeController.borrarMensajeMiembroId = async (req, res) => {
    let id = req.params.id;
    let comunidad_id = req.body.comunidad_id;
    let miembro_id = req.body.miembro_id;
    try {
        Mensaje.findOne({
            where: {
                id: id,
                comunidad_id: comunidad_id,
                miembro_id: miembro_id
            },
        }).then(mensaje => {
            if (mensaje) {
                mensaje.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `El Mensaje con el id ${id} a sido eliminado.` });
            } else {
                res.status(404).json({ msg: `El Mensaje con el id ${id} No existe` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar un Mensaje privado de un Amigo.
MensajeController.borrarMensajeAmigoId = async (req, res) => {
    let id = req.params.id;
    let amigo_id = req.body.amigo_id;
    try {
        Mensaje.findOne({
            where: {
                id: id,
                amigo_id: comunidad_id,
            },
        }).then(mensaje => {
            if (mensaje) {
                mensaje.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `El Mensaje con el id ${id} a sido eliminado.` });
            } else {
                res.status(404).json({ msg: `El Mensaje con el id ${id} No existe` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar todos los Mensajes.
MensajeController.borrarMensajes = (req, res) => {
    try {
        Mensaje.destroy({
            where: {},
            truncate: false
        })
            .then(mensajesEliminados => {
                res.send(`Se han eliminado ${mensajesEliminados} Mensajes.`);
            })
    } catch (error) {
        res.send(error);
    }
};

module.exports = MensajeController;