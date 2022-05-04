const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const MensajeController = require('../controllers/MensajeController');

// Endpoint de mostrar todos los Mensajes.
router.get('/', auth, isAdmin, MensajeController.verMensajes);
// http://localhost:5000/mensajes

// Endpoint de ver un Mensaje por ID.
router.get('/:id', auth, MensajeController.verMensajeId);
// http://localhost:5000/mensajes/id

// Endpoint de crear un Mensaje como Miembro a una Comunidad.
router.post('/miembro', auth, MensajeController.crearMensajeMiembro);
// http://localhost:5000/mensajes/miembro

// Endpoint de modificar un Mensaje de un Miembro de Comunidad.
router.put('/miembro/:id', auth, MensajeController.modificarMensajeMiembro);
// http://localhost:5000/mensajes/miembro/:id

// Endpoint de eliminar un Mensaje de un Miembro de Comunidad.
router.delete('/miembro/:id', auth, MensajeController.borrarMensajeMiembroId);
// http://localhost:5000/mensajes/miembro/:id

// Endpoint de eliminar todos los Mensajes.
router.delete('/', auth, isAdmin, MensajeController.borrarMensajes);
// http://localhost:5000/mensajes














module.exports = router;