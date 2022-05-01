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
    // Método de actualizar el perfil de Usuario con contraseña encriptada.
    async actualizarUsuario(id, body) {
        let usuarioActualizado = await Usuario.update(body, { where: { id: id } }).then(usuarioActualizado => {
            return { status: 200, datos: usuarioActualizado }
        }).catch(error => {
            return { status: 400, datos: { error: error.message } }
        });
        return usuarioActualizado;
    }
    












    // async actualizarUsuario(id, body) {
    //     let clave = false;
    //     if (Object.entries(body).length === 0) {
    //         return {
    //             status: 422,
    //             datos: {
    //                 error: 'Para cambiar los datos del usuario necesita pasar algun dato.',
    //             }
    //         }
    //     } else {
    //         if (body.clave) {
    //             delete body.clave;
    //             clave = true;
    //         }
    //         if (body.id) {
    //             return {
    //                 status: 422,
    //                 datos: {
    //                     error: 'Tu no puedes cambiar el id del usuario'
    //                 }
    //             };
    //         } else if (body.v) {
    //             return {
    //                 status: 422,
    //                 datos: {
    //                     error: 'Tu no puedes cambiar la version del usuario'
    //                 }
    //             };
    //         }
    //         let usuarioCambiado = await Usuario.update(id, body,{ new: true }).then(actualizado => {
    //             if (clave) {
    //                 return {
    //                     status: 200,
    //                     datos: {
    //                         error: 'Para cambiar la clave necesita de acceder a la sección de cambiar clave.',
    //                         usuario: actualizado
    //                     }
    //                 }
    //             } else {
    //                 return {
    //                     status: 200,
    //                     datos: {
    //                         usuario: actualizado
    //                     }
    //                 }
    //             }
    //         }).catch(error => {
    //             return {
    //                 status: 404,
    //                 datos: {
    //                     error: error.message
    //                 }
    //             }
    //         })
    //         return usuarioCambiado;
    //     }
    // }











}
let UsuarioController = new MetodosUsuario();
module.exports = UsuarioController;