const { Comunidad } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const ComunidadController = {};

// Función de mostrar todas las Comunidades.
ComunidadController.verComunidades = (req, res) => {
    Comunidad.findAll()
        .then(data => {
            res.send(data)
        });
};

// Función de ver una Comunidad por ID.
ComunidadController.verComunidadId = (req, res) => {
    let id = req.params.id;
    Comunidad.findOne({
        where: { id: id }
    }).then(data => {
        res.send(data)
    });
};

// Función de crear una Comunidad.
ComunidadController.crearComunidad = (req, res) => {
    let titulo = req.body.titulo;
    let imagen = req.body.imagen;
    let genero = req.body.genero;
    let fecha = req.body.fecha;
    let popularidad = req.body.popularidad;
    let descripcion = req.body.descripcion;
    let id_usuario = req.body.id_usuario;
    Comunidad.create({
        titulo: titulo,
        imagen: imagen,
        genero: genero,
        fecha: fecha,
        popularidad : popularidad,
        descripcion : descripcion,
    }).then(data => {
        res.send(data)
    });
};






module.exports = ComunidadController;