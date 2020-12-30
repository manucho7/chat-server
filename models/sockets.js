const { usuarioConectado, usuarioDesconectado, getUsuarios } = require('../controllers/sockets');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            console.log('cliente conectado');

            const usuario = await usuarioConectado( uid );

            console.log(`Se conecto: ${usuario.nombre}`);

            //TODO: Validar JWT 
            //Si token no es valido, desconectarlo

            //TODO: Saber que usuario esta activo via token.uid

            //TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios())

            //TODO: Socket join

            //TODO: escuchar cuando cliente manda msj
            //msg personal

            //TODO disconnect
            //Marcar en DB que el usuario se desconecto
            
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );

                this.io.emit('lista-usuarios', await getUsuarios());
            });
            
        });
    }


}


module.exports = Sockets;