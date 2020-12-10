/*
    PATH: ????
*/
const { Router } = require('express');

const router = Router();

//CREAR NUEVOS USUARIOS
router.post('/new', (req, res) => {
    res.json({
        ok: true,
        msg: 'new'
    });
});

//LOGIN
router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    });
});

//RENEW TOKEN
router.get('/renew', (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
});


module.exports = router;