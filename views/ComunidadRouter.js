const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const ComunidadController = require('../controllers/ComunidadController');

// Endpoint de mostrar todas las Comunidades.
router.get('/', ComunidadController.verComunidades);
// http://localhost:5000/comunidades

// Endpoint de ver una Comunidad por ID.
router.get('/:id', auth, ComunidadController.verComunidadId);
// http://localhost:5000/comunidades/id

// Endpoint de buscar Comunidades por genero.
router.get('/genero/:genero', ComunidadController.verComunidadGenero);
// http://localhost:5000/comunidades/:genero

// Endpoint de crear una Comunidad.
router.post('/', auth, isAdmin, ComunidadController.crearComunidad);
// http://localhost:5000/comunidades

// Endpoint de Modificar la Comunidad por ID.
router.put('/:id', auth, isAdmin, ComunidadController.modificarComunidad);
// http://localhost:5000/comunidades/:id

// Endpoint de eliminar todas las Comunidades.
router.delete('/', auth, isAdmin, ComunidadController.borrarComunidades);
// http://localhost:5000/comunidades

// Endpoint de eliminar una Comunidad por ID.
router.delete('/:id', auth, isAdmin, ComunidadController.borrarComunidadId);
// http://localhost:5000/comunidades/:id

module.exports = router;