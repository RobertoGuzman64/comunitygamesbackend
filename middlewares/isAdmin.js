const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Función de Administrador.
module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    let {usuario} = jwt.decode(token, authConfig.complemento)
    try {
        if (usuario.administrador) {
            next();
        } else {
            res.status(403).send({ msg: `El usuario no és Administrador.` });
        }
    } catch (error) {
        res.status(400).json({
            msg: `Algo malo sucedió, intente verificar la informacion y vuelve a intentarlo.`,
            error: error
        });
    }
};