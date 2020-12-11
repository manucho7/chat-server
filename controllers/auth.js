const { response } = require("express");
const { validationResult } = require("express-validator");


const crearUsuario = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'new'
    });
}

const login = async(req, res = response) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    const { email, password } = req.body;
    
    //Solo se va a ejecutar si no tenemos errores arriba
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const renewToken = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}