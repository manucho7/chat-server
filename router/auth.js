/*
    PATH: api/login
*/
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');

const router = Router();

//CREAR NUEVOS USUARIOS
router.post('/new', crearUsuario);

//LOGIN
router.post('/', login);

//RENEW TOKEN
router.get('/renew', renewToken);   

module.exports = router;