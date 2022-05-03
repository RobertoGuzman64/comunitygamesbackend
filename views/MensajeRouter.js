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




















module.exports = router;