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
    try {
        let titulo = req.body.titulo;
        let imagen = req.body.imagen;
        let genero = req.body.genero;
        let fecha = req.body.fecha;
        let popularidad = req.body.popularidad;
        let descripcion = req.body.descripcion;
        Comunidad.findOne({
            where: {
                titulo: titulo,
            }
        }).then(comunidadRepetida => {
            if (!comunidadRepetida) {
                Comunidad.create({
                    titulo: titulo,
                    imagen: imagen,
                    genero: genero,
                    fecha: fecha,
                    popularidad: popularidad,
                    descripcion: descripcion
                }).then(comunidad => {
                    res.status(201).json({ msg: `Comunidad ${comunidad.titulo}, creada!` });
                }).catch(err => res.status(400).json({ msg: `La creación de la Comunidad falló..`, error: err }));
            } else {
                res.status(400).json({ msg: `La Comunidad con el titulo "${comunidadIgual.titulo}" ya está creada.` });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: `Sucedió algo inesperado mientras creaba la Comunidad.`, error: { name: error.name, message: error.message } });
    }
}

// Función de modificar la Comunidad por ID.
ComunidadController.modificarComunidad = (req, res) => {
    let datos = req.body;
    let id = req.params.pk;
    try {
        if (datos.titulo) {
            Comunidad.findOne({
                where: {
                    titulo: datos.titulo
                }
            }).then(comunidad => {
                if (comunidad) {
                    res.status(409).json({ msg: "La Comunidad con este título ya existe." })
                } else {
                    Comunidad.update(datos, {
                        where: { id: id }
                    }).then(() => {
                        res.status(200).json({
                            msg: `La Comunidad con el id ${id} a sido Actualizada.`,
                        });
                    });
                }
            })
        } else {
            Comunidad.update(datos, {
                where: { id: id }
            }).then(() => {
                res.status(200).json({
                    msg: `La Comunidad con el id ${id} a sido Actualizada.`,
                });
            });
        }
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar todas las Comunidades.
ComunidadController.borrarComunidades = (req, res) => {
    try {
        Comunidad.destroy({
            where: {},
            truncate: false
        })
            .then(comunidadesEliminadas => {
                res.send(`Se han eliminado ${comunidadesEliminadas} Comunidades.`);
            })
    } catch (error) {
        res.send(error);
    }
};

// Función de eliminar una Comunidad por ID.
ComunidadController.borrarComunidadId = async (req, res) => {
    let id = req.params.pk;
    try {
        Comunidad.findOne({
            where: { id: id },
        }).then(comunidad => {
            if (comunidad) {
                comunidad.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `La Comunidad con el id ${id} a sido eliminada.` });
            } else {
                res.status(404).json({ msg: `La Comunidad con el id ${id} No existe` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = ComunidadController;