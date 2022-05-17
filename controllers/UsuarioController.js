const { Usuario } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const UsuarioController = {};

// Función de mostrar todos los Usuarios.
UsuarioController.verUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar los usuarios',
            error
        });
    }
};

// Función de ver un Usuario por ID.
UsuarioController.verUsuarioId = async (req, res) => {
    try {
        const datos = await Usuario.findByPk(req.params.id);
        res.send(datos);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al obtener el usuario'
        });
    }
};

// Función de crear un Usuario.
UsuarioController.crearUsuario = async (req, res) => {
    try {
        const { nick, nombre, apellidos, edad, email, clave, discord, juego } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                [Op.or]: [{ email: email }, { nick: nick }, { discord: discord }]
            }
        });
        if (usuario) {
            return res.status(400).send({
                message: 'El usuario ya existe'
            });
        }
        const claveEncriptada = bcrypt.hashSync(clave, Number.parseInt(authConfig.rondas));
        const usuarioNuevo = await Usuario.create({
            nick,
            nombre,
            apellidos,
            edad,
            email,
            clave : claveEncriptada,
            discord,
            juego
        });
        res.send(usuarioNuevo);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al crear el usuario'
        });
    }
};

// Función de Login de Usuario.
UsuarioController.login = async (req, res) => {
    try {
        const { email, clave } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                email: email
            }
        });
        if (!usuario) {
            return res.status(400).send({
                message: 'El usuario no existe'
            });
        }
        if (!bcrypt.compareSync(clave, usuario.clave)) {
            return res.status(400).send({
                message: 'La contraseña no es correcta'
            });
        }
        const token = jwt.sign({ id: usuario.id }, authConfig.complemento, {
            expiresIn: authConfig.expiracion
        });
        res.send({
            message: 'Login correcto',
            token: token,
            usuario: {
                id: usuario.id,
                nick: usuario.nick,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                edad: usuario.edad,
                email: usuario.email,
                discord: usuario.discord,
                juego: usuario.juego
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al hacer login'
        });
    }
};

// Función de Modificar el perfil por ID.
UsuarioController.modificarUsuarioId = async (req, res) => {
    let datos = req.body;
    let id = req.params.id;
    try {
        Usuario.update(datos, {
            where: { id: id }
        }).then(modificarUsuario => {
            res.status(200).json({ msg: `Usuario con el id ${id} a sido Actualizado.`, usuario: modificarUsuario });
        }).catch(error => res.status(422).json({ msg: `Ocurrió algo inesperado al obtener los datos del usuario.`, error: { name: error.name, message: error.message, detail: error } }));
    } catch (error) {
        res.status(422).json({ msg: `Ocurrió algo inesperado al obtener los datos del usuario.`, error: { name: error.name, message: error.message, detail: error } });
    }
}
// Función de Modificar la contraseña por ID.
UsuarioController.modificarClaveUsuarioId = (req, res) => {
    let id = req.params.id;
    let claveAnterior = req.body.claveAnterior;
    let claveNueva = req.body.claveNueva;
    Usuario.findOne({
        where: { id: id }
    }).then(usuarioEncontrado => {
        if (usuarioEncontrado) {
            if (bcrypt.compareSync(claveAnterior, usuarioEncontrado.clave)) {
                claveNueva = bcrypt.hashSync(claveNueva, Number.parseInt(authConfig.rondas));
                let data = {
                    clave: claveNueva
                }
                usuarioEncontrado.update(data, {})
                    .then(actualiza => {
                        res.send(actualiza);
                    })
                    .catch((error) => {
                        res.status(400).json({
                            msg: `Ocurrió algún error al actualizar la contraseña.`,
                            error: error
                        });
                    });
            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos." });
            }
        } else {
            res.status(404).send(`Usuario no encontrado.`);
        }
    }).catch((error => {
        res.status(400).json({ msg: `sucedió algo inesperado.`, error: { name: error.name, message: error.message } });
    }));
};

// Función de eliminar todos los Usuarios.
UsuarioController.borrarUsuarios = async (req, res) => {
    try {
        Usuario.destroy({
            where: {},
            truncate: false
        })
            .then(usuariosEliminados => {
                res.send(`Se han eliminado ${usuariosEliminados} usuarios`);
            })
    } catch (error) {
        res.send(error);
    }
};

// Función de eliminar un usuario por ID.
UsuarioController.borrarUsuarioId = async (req, res) => {
    let id = req.params.id;
    try {
        Usuario.findOne({
            where: { id: id },
        }).then(usuario => {
            if (usuario) {
                usuario.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `El Usuario con la id ${id} a sido eliminado.` });
            } else {
                res.status(404).json({ msg: `El Usuario con la id ${id} No existe` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = UsuarioController;