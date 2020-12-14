const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, ( error, token ) => {

            if ( error ) {
                console.log( error );
                reject('no se pudo generar el token');
            } else {
                resolve( token )
            }
            
        });

    });

}

module.exports = {
    generarJWT
}