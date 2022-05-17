const { Comunidad } = require('../models/index');
const ComunidadController = {};

// Función de mostrar todas las Comunidades.
ComunidadController.verComunidades = async (req, res) => {
    try {
        const comunidades = await Comunidad.findAll();
        res.json(comunidades);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar las Comunidades',
            error
        });
    }
};

// Función de ver una Comunidad por ID.
ComunidadController.verComunidadId = async (req, res) => {
    try {
        const comunidad = await Comunidad.findByPk(req.params.id);
        res.send(comunidad);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar la Comunidad',
        });
    }
};

// Función de buscar Comunidades por género.
ComunidadController.verComunidadGenero = async (req, res) => {
    try {
        const comunidades = await Comunidad.findAll({
            where: {
                genero: req.params.genero
            }
        });
        res.send(comunidades);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar las Comunidades',
        });
    }
};

// Función de crear una Comunidad con try catch y mensajes de error.
ComunidadController.crearComunidad = async (req, res) => {
    try {
        const { titulo, imagen, genero, fecha, popularidad, descripcion } = req.body;
        const comunidad = await Comunidad.findOne({
            where: {
                titulo: titulo
            }
        });
        if (comunidad) {
            return res.status(400).send({
                message: 'La comunidad ya existe'
            });
        }
        const comunidadNueva = await Comunidad.create({
            titulo,
            imagen,
            genero,
            fecha,
            popularidad,
            descripcion
        });
        res.send(comunidadNueva);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al crear la Comunidad',
        });
    }
};

// Función de modificar la Comunidad por ID.
ComunidadController.modificarComunidadId = async (req, res) => {
    try {
        const { titulo, imagen, genero, fecha, popularidad, descripcion } = req.body;
        const comunidad = await Comunidad.findByPk(req.params.id);
        if (!comunidad) {
            return res.status(400).send({
                message: 'La comunidad no existe'
            });
        }
        const comunidadModificada = await comunidad.update({
            titulo,
            imagen,
            genero,
            fecha,
            popularidad,
            descripcion
        });
        res.send({
            message: `La Comunidad con el id ${comunidad.id} a sido Modificada.`,
            comunidadModificada
        });
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            message: 'Error al modificar la Comunidad',
        });
    }
};

// Función de eliminar todas las Comunidades.
ComunidadController.borrarComunidades = async (req, res) => {
    try {
        const comunidades = await Comunidad.destroy({
            where: {}
        });
        res.send({
            message: `Se eliminaron ${comunidades} Comunidades`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar las Comunidades',
        });
    }
};

// Función de eliminar una Comunidad por ID.
ComunidadController.borrarComunidadId = async (req, res) => {
    let id = req.params.id;
    try {
        const comunidad = await Comunidad.findByPk(id);
        if (!comunidad) {
            return res.status(400).send({
                message: 'La comunidad no existe'
            });
        }
        const comunidadBorrada = await Comunidad.destroy({
            where: { id: id }
        });
        res.send({
            message: `La Comunidad con el id ${comunidad.id} a sido Eliminada.`,
            comunidadBorrada
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar la Comunidad'
        });
    }
};

module.exports = ComunidadController;