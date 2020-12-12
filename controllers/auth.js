const { response } = require("express");
const Usuario = require('../models/usuario');


const crearUsuario = async(req, res = response) => {

    
    try {
        
        const { email, password } = req.body;

        const existeEmail = await Usuario.findOne({ email });

        //verificar que email no exista
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado"
            });
        }

        //TODO encriptar contra

        //Generar instancia de nuevo usuario y Guardarlo DB
        const usuario = new Usuario(req.body);
        await usuario.save();
        

        res.json({
            usuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
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