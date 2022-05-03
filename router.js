const router = require('express').Router();

const UsuarioRouter = require('./views/UsuarioRouter');
const ComunidadRouter = require('./views/ComunidadRouter');
const MiembroRouter = require('./views/MiembroRouter');
// const AmigoRouter = require('./views/AmigoRouter');
// const MensajeRouter = require('./views/MensajeRouter');

router.use('/usuarios', UsuarioRouter);
router.use('/comunidades', ComunidadRouter);
router.use('/miembros', MiembroRouter);
// router.use('/amigos', AmigoRouter);
// router.use('/mensajes', MensajeRouter);

module.exports = router;