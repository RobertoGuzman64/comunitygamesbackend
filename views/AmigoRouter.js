const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const AmigoController = require('../controllers/AmigoController');

// Endpoint de mostrar todos los Amigos.
router.get('/', auth, isAdmin, AmigoController.verAmigos);
// http://localhost:5000/amigos



















module.exports = router;