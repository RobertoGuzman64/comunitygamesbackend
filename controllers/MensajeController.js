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

// Función de modificar un Mensaje de un Miembro a una comunidad. CREO QUE FALTA EL ID DEL MENSAJE let id = req.params.id;
MensajeController.modificarMensajeMiembro = (req, res) => {
    let comunidad_id = req.params.comunidad_id;
    let miembro_id = req.params.miembro_id;
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

// Función de modificar un Mensaje privado de un Amigo.  CREO QUE FALTA EL ID DEL MENSAJE let id = req.params.id;
MensajeController.modificarMensajeAmigo = (req, res) => {
    let amigo_id = req.params.amigo_id;
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



















module.exports = MensajeController;