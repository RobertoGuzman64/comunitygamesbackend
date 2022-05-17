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
        const token = jwt.sign({ usuario: usuario }, authConfig.complemento, {
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

// Función de modificar el perfil por id con try catch y mensajes de error en caso de error.
UsuarioController.modificarUsuarioId = async (req, res) => {
    try {
        const { nick, nombre, apellidos, edad, discord, juego } = req.body;
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(400).send({
                message: 'El usuario no existe'
            });
        }
        const usuarioModificado = await usuario.update({
            nick,
            nombre,
            apellidos,
            edad,
            discord,
            juego
        });
        res.send({
            message: `El Usuario con la id ${usuario.id} a sido Modificado.`,
            usuario: usuarioModificado
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al modificar el usuario'
        });
    }
};

// Función de Modificar la contraseña por ID.
UsuarioController.modificarClaveUsuarioId = async (req, res) => {
    let id = req.params.id;
    let claveAnterior = req.body.claveAnterior;
    let claveNueva = req.body.claveNueva;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!bcrypt.compareSync(claveAnterior, usuario.clave)) {
            return res.status(400).send({
                message: 'La contraseña anterior no es correcta'
            });
        }
        const claveEncriptada = bcrypt.hashSync(claveNueva, Number.parseInt(authConfig.rondas));
        Usuario.update({ clave: claveEncriptada }, {
            where: { id: id }
        }).then(modificarUsuario => {
            res.status(200).json({ msg: `Usuario con el id ${id} a sido Actualizado.`, usuario: modificarUsuario });
        }).catch(error => res.status(422).json({ msg: `Ocurrió algo inesperado al obtener los datos del usuario.`, error: { name: error.name, message: error.message, detail: error } }));
    } catch (error) {
        res.status(422).json({ msg: `Ocurrió algo inesperado al obtener los datos del usuario.`, error: { name: error.name, message: error.message, detail: error } });
    }
}

// Función de eliminar todos los Usuarios con try catch y mensaje de error en caso de error.y también mostrar el número de Usuarios eliminados.
UsuarioController.borrarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.destroy({
            where: {}
        });
        res.send({
            message: `Se eliminaron ${usuarios} usuarios`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar los usuarios'
        });
    }
};

// Función de eliminar un usuario por ID.
UsuarioController.borrarUsuarioId = async (req, res) => {
    let id = req.params.id;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).send({
                message: 'El usuario no existe'
            });
        }
        const usuarioBorrado = await Usuario.destroy({
            where: { id: id }
        });
        res.send({
            message: `El Usuario con la id ${usuario.id} a sido eliminado.`,
            usuario: usuarioBorrado
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar el usuario'
        });
    }
};

module.exports = UsuarioController;