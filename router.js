const router = require('express').Router();

const UsuarioRouter = require('./views/UsuarioRouter');
const ComunidadRouter = require('./views/ComunidadRouter');
const MiembroRouter = require('./views/MiembroRouter');
const MensajeRouter = require('./views/MensajeRouter');
// const AmigoRouter = require('./views/AmigoRouter');

router.use('/usuarios', UsuarioRouter);
router.use('/comunidades', ComunidadRouter);
router.use('/miembros', MiembroRouter);
router.use('/mensajes', MensajeRouter);
// router.use('/amigos', AmigoRouter);

module.exports = router;