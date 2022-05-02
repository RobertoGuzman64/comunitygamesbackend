const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const ComunidadController = require('../controllers/ComunidadController');

// Endpoint de mostrar todas las Comunidades.
router.get('/', auth, ComunidadController.verComunidades);
// http://localhost:5000/comunidades

// Endpoint de ver una Comunidad por ID.
router.get('/:id', auth, isAdmin, ComunidadController.verComunidadId);
// http://localhost:5000/comunidades/id

// Endpoint de crear una Comunidad.
router.post('/', auth, isAdmin, ComunidadController.crearComunidad);
// http://localhost:5000/comunidades














module.exports = router;