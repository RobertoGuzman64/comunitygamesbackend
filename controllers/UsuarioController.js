const { Usuario } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

class MetodosUsuario {
    constructor() {
    }
    // Método de crear un Usuario.
    async crearUsuario(body) {
        body.clave = bcrypt.hashSync(body.clave, Number.parseInt(authConfig.rondas));
        let usuarioNuevo = await Usuario.create(body).then(usuarioNuevo => {
            return { status: 201, datos: usuarioNuevo }
        }).catch(error => {
            return { status: 400, datos: { error: error.message } }
        });
        return usuarioNuevo;
    }
    // Método mostrar los Usuarios.
    async mostrarUsuarios(req, res) {
        let usuarios = await Usuario.findAll().then(usuarios => {
            return { status: 200, datos: usuarios }
        }).catch(error => {
            return { status: 400, datos: { error: error.message } }
        });
        return usuarios;
    }
    // Método de login.
    async login(body) {
        let email = body.email;
        let clave = body.clave;
        
        const usuarioLogueado = await Usuario.findOne({where:{ email: email }}).then(usuarioEncontrado => {
            if (!usuarioEncontrado) {
                return { // No existe Usuario
                    status: 401,
                    datos: {
                        msg: "Usuario o contraseña inválido"
                    }
                }
            } else {
                // Comprueba clave
                if (bcrypt.compareSync(clave, usuarioEncontrado.clave)) {
                    let token = jwt.sign({ usuario: usuarioEncontrado }, authConfig.complemento, {
                        expiresIn: authConfig.expiracion
                    });
                    return { //clave correcta
                        status: 200,
                        datos: {
                            usuario: usuarioEncontrado,
                            token
                        }
                    }
                } else {
                    return { // clave incorrecta
                        status: 401,
                        datos: {
                            msg: "Usuario o contraseña inválido"
                        }
                    };
                }
            };
        });
        return usuarioLogueado;
    }










}
let UsuarioController = new MetodosUsuario();
module.exports = UsuarioController;