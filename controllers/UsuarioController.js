const { Usuario } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

class MetodosUsuario {
    constructor() {
    }
    // Método de crear un Usuario con contraseña encriptada.
    async crearUsuario(body) {
        body.clave = bcrypt.hashSync(body.clave, Number.parseInt(authConfig.rondas));
        let usuarioNuevo = await Usuario.create(body).then(usuarioNuevo => {
            return { status: 201, datos: usuarioNuevo }
        }).catch(error => {
            return { status: 400, datos: { error: error.message } }
        });
        return usuarioNuevo;
    }

}
let UsuarioController = new MetodosUsuario();
module.exports = UsuarioController;