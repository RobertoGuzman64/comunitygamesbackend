const router = require('express').Router();

// const AmigoRouter = require('./views/AmigoRouter');
// const ComunidadRouter = require('./views/ComunidadRouter');
// const JuegoRouter = require('./views/JuegoRouter');
// const MensajeRouter = require('./views/MensajeRouter');
// const MiembroRouter = require('./views/MiembroRouter');
const UsuarioRouter = require('./views/UsuarioRouter');

// router.use('/amigos', AmigoRouter);
// router.use('/comunidades', ComunidadRouter);
// router.use('/juegos', JuegoRouter);
// router.use('/mensajes', MensajeRouter);
// router.use('/miembros', MiembroRouter);
router.use('/usuarios', UsuarioRouter);

module.exports = router;