const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const ComunidadController = require('../controllers/ComunidadController');



module.exports = router;