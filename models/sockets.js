

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('cliente conectado');

            //TODO: Validar JWT 
            //Si token no es valido, desconectarlo

            //TODO: Saber que usuario esta activo via token.uid

            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket join

            //TODO: escuchar cuando cliente manda msj
            //msg personal

            //TODO disconnect
            //Marcar en DB que el usuario se desconecto
            
            socket.on('disconnect', () => {
                console.log('cliente desconectado')
            });
        
        });
    }


}


module.exports = Sockets;