/*
    PATH: api/login
*/
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const {check} = require('express-validator');
const router = Router();

//CREAR NUEVOS USUARIOS
router.post('/new', crearUsuario);

//LOGIN
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
], login);

//RENEW TOKEN
router.get('/renew', renewToken);   

module.exports = router;