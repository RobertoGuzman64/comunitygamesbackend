const { Usuario } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const UsuarioController = {};


// Función de mostrar todos los Usuarios.
UsuarioController.verUsuarios = (req, res) => {
    Usuario.findAll()
        .then(data => {
            res.send(data)
        });
};

// Función de ver un Usuario por ID.
UsuarioController.verUsuarioId = (req, res) => {
    let id = req.params.id;
    Usuario.findOne({
        where: { id: id }
    }).then(data => {
        res.send(data)
    });
};

// Función de registrar Usuario.
UsuarioController.crearUsuario = async (req, res) => {
    let nick = req.body.nick;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let edad = req.body.edad;
    let email = req.body.email;
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rondas));
    let discord = req.body.discord;
    let juego = req.body.juego;
    Usuario.findAll({
        where: {
            [Op.or]: [
                {
                    email: {
                        [Op.like]: email
                    }
                },
                {
                    nick: {
                        [Op.like]: nick
                    }
                }
            ]
        }
    }).then(datosRepetidos => {
        if (datosRepetidos == 0) {
            Usuario.create({
                nick: nick,
                nombre: nombre,
                apellidos: apellidos,
                edad: edad,
                email: email,
                clave: clave,
                discord: discord,
                juego: juego,
            }).then(usuario => {
                res.send(`${usuario.nombre}, bienvenid@ a nuestra app de Comunidades de Juegos`);
            })
                .catch((error) => {
                    res.send(error);
                });
        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });
};

// Función de Login de Usuario.
UsuarioController.login = (req, res) => {
    let email = req.body.email;
    let clave = req.body.clave;
    Usuario.findOne({
        where: { email: email }
    }).then(element => {
        if (!element) {
            res.send("Usuario o contraseña inválido");
        } else {
            if (bcrypt.compareSync(clave, element.clave)) {
                console.log(element.clave);
                let token = jwt.sign({ usuario: element }, authConfig.complemento, {
                    expiresIn: authConfig.expiracion
                });
                res.json({
                    usuario: element,
                    token: token
                })
            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválido" });
            }
        };
    }).catch(error => {
        res.send(error);
    })
};

// Función de Modificar el perfil por ID.
UsuarioController.modificarUsuario = async (req, res) => {
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

// Funcion de eliminar todos los Usuarios.
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
    let id = req.params.pk;
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