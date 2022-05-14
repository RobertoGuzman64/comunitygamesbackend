const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');
const PORT = process.env.PORT || 5000;
const router = require('./router');

let opcionesCors = {//CONFIGURO OPCIONES DE CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
//Middleware
app.use(express.json()); //PUEDO OBTENER JSON DEL BODY
app.use(cors(opcionesCors));  //USO CORS
app.use(router);

// app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));
db.then(()=>{
    app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));
})
.catch((err)=> console.log(err.message));