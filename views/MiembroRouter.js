const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const MiembroController = require('../controllers/MiembroController');

// Endpoint de mostrar todos los Miembros.
router.get('/', auth, isAdmin, MiembroController.verMiembros);
// http://localhost:5000/miembros

// Endpoint de ver un Miembro por ID.
router.get('/:id', auth, isAdmin, MiembroController.verMiembroId);
// http://localhost:5000/miembros/id

// Endpoint de ver los Miembros por Comunidad ID.
router.get('/comunidad/:id', auth, MiembroController.verMiembrosComunidadId);
// http://localhost:5000/miembros/comunidad/id

// Endpoint de crear un Miembro.
router.post('/', auth, MiembroController.crearMiembro);
// http://localhost:5000/comunidades

// Endpoint de Modificar los datos del Miembro por ID.
router.put('/:id', auth, MiembroController.modificarMiembroId);
// http://localhost:5000/miembros/:id

// Endpoint de eliminar todos los Miembros las Comunidades.
router.delete('/', auth, isAdmin, MiembroController.borrarMiembros);
// http://localhost:5000/miembros

// Endpoint de eliminar un Miembro por ID.
router.delete('/:id', auth, MiembroController.borrarMiembroId);
// http://localhost:5000/miembros/:id

module.exports = router;