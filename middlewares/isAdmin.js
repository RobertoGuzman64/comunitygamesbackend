const { Usuario } = require('../models/index');

// Función de Administrador.

module.exports = (req, res, next) => {
    let id = req.body.id;
    Usuario.findOne({
        where : { id : id }
    }).then(usuarioEncontrado => {
        if(usuarioEncontrado.rol == 1){
            next();
        }else {
            res.send(`El usuario no es Admin`)
        }
    }).catch(error => {
        res.send(error)
    })
}