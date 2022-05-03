const { Miembro } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const MiembroController = {};

// Función de mostrar todos los Miembros.
MiembroController.verMiembros = (req, res) => {
    try {
        Miembro.findAll()
            .then(datos => {
                res.send(datos);
            });
    } catch (err) {
        res.send(err);
    }
}

// Función de ver un Miembro por ID.
MiembroController.verMiembroId = (req, res) => {
    try {
        Miembro.findByPk(req.params.id)
            .then(datos => {
                res.send(datos)
            });
    } catch (error) {
        res.send(error);
    }
}

// Función de ver todos los Miembros de una Comunidad.
MiembroController.verMiembrosComunidadId = (req, res) => {
    try {
        Miembro.findAll({
            where: {
                comunidad_id: req.params.id
            }
        }).then(datos => {
            res.send(datos);
        });
    } catch (error) {
        res.send(error);
    }
}

// Función de crear un Miembro de la Comunidad.
MiembroController.crearMiembro = (req, res) => {
    try {
        let comunidad_id = req.body.comunidad_id;
        let usuario_id = req.body.usuario_id;
        let nick = req.body.nick;
        let motivo = req.body.motivo;
        let avatar = req.body.avatar;
        let fecha = req.body.fecha;
        Miembro.findOne({
            where: {
                nick: nick,
            }
        }).then(miembroRepetido => {
            if (!miembroRepetido) {
                Miembro.create({
                    comunidad_id: comunidad_id,
                    usuario_id: usuario_id,
                    nick: nick,
                    motivo: motivo,
                    avatar: avatar,
                    fecha: fecha,
                }).then(miembro => {
                    res.status(201).json({ msg: `Miembro ${miembro.nick}, creado!` });
                }).catch(err => res.status(400).json({ msg: `La creación del Miembro falló..`, error: err }));
            } else {
                res.status(400).json({ msg: `El Miembro con el nick "${miembroRepetido.nick}" ya está creado.` });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: `Sucedió algo inesperado mientras creaba el Miembro.`, error: { name: error.name, message: error.message } });
    }
}

// Función de modificar los datos de un Miembro de la Comunidad.
MiembroController.modificarMiembro = (req, res) => {
    let datos = req.body;
    let id = req.params.id;
    try {
        if (datos.id) {
            Miembro.findOne({
                where: {
                    id: datos.id
                }
            }).then(miembro => {
                if (miembro) {
                    res.status(409).json({ msg: "El Miembro con esta id ya existe." })
                } else {
                    Miembro.update(datos, {
                        where: { id: id }
                    }).then(() => {
                        res.status(200).json({
                            msg: `El Miembro id ${id} a sido Actualizado.`,
                        });
                    });
                }
            })
        } else {
            Miembro.update(datos, {
                where: { id: id }
            }).then(() => {
                res.status(200).json({
                    msg: `El Miembro con el id ${id} a sido Actualizado.`,
                });
            });
        }
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar todos los Miembros de todas las Comunidades.
MiembroController.borrarMiembros = (req, res) => {
    try {
        Miembro.destroy({
            where: {},
            truncate: true
        }).then(() => {
            res.status(200).json({ msg: "Todos los Miembros de todas las Comunidades han sido eliminados." });
        });
    } catch (error) {
        res.send(error);
    }
}

// Función de eliminar una Comunidad por ID.
MiembroController.borrarMiembroId = async (req, res) => {
    let id = req.params.pk;
    try {
        Miembro.findOne({
            where: { id: id },
        }).then(miembro => {
            if (miembro) {
                miembro.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `La Miembro con el id ${id} a sido eliminado.` });
            } else {
                res.status(404).json({ msg: `El Miembro con el id ${id} No existe` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = MiembroController;