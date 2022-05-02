const router = require('express').Router();

const UsuarioRouter = require('./views/UsuarioRouter');
const ComunidadRouter = require('./views/ComunidadRouter');
// const AmigoRouter = require('./views/AmigoRouter');
// const MensajeRouter = require('./views/MensajeRouter');
// const MiembroRouter = require('./views/MiembroRouter');

router.use('/usuarios', UsuarioRouter);
router.use('/comunidades', ComunidadRouter);
// router.use('/amigos', AmigoRouter);
// router.use('/mensajes', MensajeRouter);
// router.use('/miembros', MiembroRouter);

module.exports = router;