const { response } = require("express");


const crearUsuario = async(req, res = response) => {

    const { nombre, password, email } = req.body;

    res.json({
        ok: true,
        msg: 'new',
        nombre,
        password,
        email
    });
}

const login = async(req, res = response) => {

    const { email, password } = req.body;

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