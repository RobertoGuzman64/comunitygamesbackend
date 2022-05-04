const { Amigo } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const AmigoController = {};

// Función de mostrar todos los Amigos.
AmigoController.verAmigos = (req, res) => {
    try {
        Amigo.findAll()
            .then(datos => {
                res.send(datos);
            });
    } catch (error) {
        res.send(error);
    }
}


















module.exports = AmigoController;