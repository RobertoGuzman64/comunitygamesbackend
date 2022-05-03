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



















module.exports = MensajeController;