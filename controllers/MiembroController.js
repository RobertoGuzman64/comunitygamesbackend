const { Miembro } = require('../models/index');
const MiembroController = {};

// Función de mostrar todos los Miembros.
MiembroController.verMiembros = async (req, res) => {
    try {
        const miembros = await Miembro.findAll();
        res.json(miembros);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar los Miembros',
            error
        });
    }
};

// Función de ver un Miembro por ID.
MiembroController.verMiembroId = async (req, res) => {
    try {
        const miembro = await Miembro.findByPk(req.params.id);
        res.send(miembro);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar el Miembro',
        });
    }
};

// Función de ver todos los Miembros de una Comunidad.
MiembroController.verMiembrosComunidadId = async (req, res) => {
    try {
        const miembros = await Miembro.findAll({
            where: {
                comunidad_id: req.params.id
            }
        });
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar los Miembros',
        });
    }
};

// Función de ver los Miembros de una Comunidad por ID de usuario con inner join para ver el nombre de la comunidad.
MiembroController.verMiembrosUsuarioId = async (req, res) => {
    try {
        const miembros = await Miembro.findAll({
            where: {
                usuario_id: req.params.id
            },
            include: [{
                model: Comunidad,
                attributes: ['nombre']
            }]
        });
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al mostrar los Miembros',
        });
    }
};

// Función de crear un Miembro de la Comunidad.
MiembroController.crearMiembro = async (req, res) => {
    try {
        const { comunidad_id, usuario_id, nick, avatar, fecha } = req.body;
        const miembro = await Miembro.findOne({
            where: {
                comunidad_id: comunidad_id,
                usuario_id: usuario_id
            }
        });
        if (miembro) {
            return res.status(400).send({
                message: 'El Miembro ya existe'
            });
        }
        const miembroNuevo = await Miembro.create({
            comunidad_id,
            usuario_id,
            nick,
            avatar,
            fecha
        });
        res.send({
            message: `El Miembro con el nick ${miembroNuevo.nick} a sido Creado.`,
            miembroNuevo
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al crear el Miembro',
        });
    }
};

// Función de modificar los datos de un Miembro de la Comunidad.
MiembroController.modificarMiembroId = async (req, res) => {
    try {
        const { comunidad_id, usuario_id, avatar, } = req.body;
        const miembro = await Miembro.findByPk(req.params.id);
        if (!miembro) {
            return res.status(400).send({
                message: 'El Miembro no existe'
            });
        }
        const miembroModificado = await miembro.update({
            comunidad_id,
            usuario_id,
            avatar,
        });
        res.send({
            message: `El Miembro con el nick ${miembro.nick} a sido Modificado.`,
            miembroModificado
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al modificar el Miembro',
        });
    }
};

// Función de eliminar todos los Miembros de todas las Comunidades.
MiembroController.borrarMiembros = async (req, res) => {
    try {
        const miembros = await Miembro.destroy({
            where: {}
        });
        res.send({
            message: `Se eliminaron ${miembros} Miembros.`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar los Miembros',
        });
    }
};

// Función de eliminar un Miembro por ID de usuario y de comunidad solamente.
MiembroController.borrarMiembroId = async (req, res) => {
    try {
        const miembro = await Miembro.findByPk(req.params.id);
        if (!miembro) {
            return res.status(400).send({
                message: 'El Miembro no existe'
            });
        }
        const miembroEliminado = await miembro.destroy();
        res.send({
            message: `El Miembro con el nick ${miembro.nick} a sido Eliminado.`,
            miembroEliminado
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al eliminar el Miembro',
        });
    }
};

module.exports = MiembroController;