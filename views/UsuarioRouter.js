const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuarioController = require('../controllers/UsuarioController');

// POST
// Endpoint de crear un Usuario.
// http://localhost:5000/usuarios

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        let respuesta = await UsuarioController.crearUsuario(body);
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});









module.exports = router;