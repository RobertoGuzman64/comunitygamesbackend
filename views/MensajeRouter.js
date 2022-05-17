const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const MensajeController = require('../controllers/MensajeController');

// URL de acceso a los endpoints de Heroku.
// https://comunitygamesbackend.herokuapp.com/

// Endpoint de mostrar todos los Mensajes.
router.get('/', auth, isAdmin, MensajeController.verMensajes);
// http://localhost:5000/mensajes

// Endpoint de ver un Mensaje por ID.
router.get('/:id', auth, MensajeController.verMensajeId);
// http://localhost:5000/mensajes/id

// Endpoint de ver los Mensajes por Comunidad ID.
router.get('/comunidad/:id', auth, MensajeController.verMensajesComunidadId);
// http://localhost:5000/mensajes/comunidad/id

// Endpoint de crear un Mensaje.
router.post('/', auth, MensajeController.crearMensaje);
// http://localhost:5000/mensajes

// Endpoint de modificar un Mensaje.
router.put('/:id', auth, MensajeController.modificarMensajeId);
// http://localhost:5000/mensajes/:id

// Endpoint de eliminar un Mensaje por ID.
router.delete('/:id', auth, MensajeController.borrarMensajeId);
// http://localhost:5000/mensajes/:id

// Endpoint de eliminar todos los Mensajes.
router.delete('/', auth, isAdmin, MensajeController.borrarMensajes);
// http://localhost:5000/mensajes














module.exports = router;