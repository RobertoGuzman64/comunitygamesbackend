const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuarioController = require('../controllers/UsuarioController');

// Endpoint de mostrar todos los Usuarios.
router.get('/', auth, UsuarioController.verUsuarios);
// http://localhost:5000/usuarios

// Endpoint de ver un Usuario por ID.
router.get('/:id', auth, isAdmin, UsuarioController.verUsuarioId);
// http://localhost:5000/usuarios/id

// Endpoint de registrar Usuario.
router.post('/', UsuarioController.crearUsuario);
// http://localhost:5000/usuarios

// Endpoint de Login de Usuario.
router.post('/login', UsuarioController.login);
// http://localhost:5000/usuarios/login

// Endpoint de Modificar el perfil por ID.
router.put('/:id', auth, UsuarioController.modificarUsuario);
// http://localhost:5000/usuarios/:id

// Endpoint de eliminar todos los Usuarios.
router.delete('/', auth, isAdmin, UsuarioController.borrarUsuarios);
// http://localhost:5000/usuarios

// Endpoint de eliminar un Usuario por ID.
router.delete('/:pk', auth, isAdmin, UsuarioController.borrarUsuarioId);
// http://localhost:5000/usuarios/:id

module.exports = router;