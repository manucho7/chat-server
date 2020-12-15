const { response } = require("express");
const bcrypt       = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

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

        //Generar instancia de nuevo usuario
        const usuario = new Usuario(req.body);

        //Encriptar password 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardando usuario en DB
        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        
        //Verificar si existe el correo 
        const usuarioDB = await Usuario.findOne({ email });

        //Validacion y resp en caso de no existir
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        const token = await generarJWT( usuarioDB.id );

        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

}

const renewToken = async(req, res) => {
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