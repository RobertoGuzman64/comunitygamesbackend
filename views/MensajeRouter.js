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

// Endpoint de crear un Mensaje privado como Amigo.
router.post('/amigo', auth, MensajeController.crearMensajeAmigo);
// http://localhost:5000/mensajes/amigo

// Endpoint de modificar un Mensaje de un Miembro de Comunidad.
router.put('/miembro/:id/:id/:id', auth, MensajeController.modificarMensajeMiembro);
// http://localhost:5000/mensajes/miembro/:id/:id

// Endpoint de modificar un Mensaje privado de un Amigo.
router.put('/amigo/:id/:id/:id', auth, MensajeController.modificarMensajeAmigo);
// http://localhost:5000/mensajes/amigo/:id/:id

// Endpoint de eliminar un Mensaje de un Miembro de Comunidad.
router.delete('/miembro/:id/:id/:id', auth, MensajeController.borrarMensajeMiembro);
// http://localhost:5000/mensajes/miembro/:id/:id/:id
















module.exports = router;