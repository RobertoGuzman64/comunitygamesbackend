const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuarioController = require('../controllers/UsuarioController');

// POST
// Endpoint de crearUsuario.
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
// GET
// Endpoint de mostrarUsuarios.
// http://localhost:5000/usuarios
router.get("/", async (req, res) => {
    try {
        let respuesta = await UsuarioController.mostrarUsuarios();
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
// POST
// Endpoint de login.
// http://localhost:5000/usuarios/login
router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        let respuesta = await UsuarioController.login(body);
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});








module.exports = router;