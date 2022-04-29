
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    console.log(req.headers);
    // Comprueba que existe el token.
    if(!req.headers.authorization){
        res.status(401).json({msg:"Acceso no autorizado"});
    }else{
    // Comprueba la validez de el token.
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, authConfig.secret, (err,decoded) => {
            if(err){
                res.status(500).json({msg:"Ha ocurrido un problema al decodificar el token", err});
            }else{
                req.user = decoded;
                next();
            }
        })
    }
}