/*
    PATH: api/login
*/
const { Router } = require('express');
const {check} = require('express-validator');

//Controladores
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../helpers/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//CREAR NUEVOS USUARIOS
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    validarCampos
], crearUsuario);

//LOGIN
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

//RENEW TOKEN
router.get('/renew', validarJWT, renewToken);   

module.exports = router;