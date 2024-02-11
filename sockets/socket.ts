import { Socket, Server as SocketIOServer } from "socket.io";

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('* Cliente desconectado')
    });
};

export const message = (client: Socket) => {
    client.on('message', (payload: { from: string, body: string, rut: string }) => {
        console.log('> Mensaje recibido: ', payload)
    });
};

export const challengepass = (client: Socket, io: SocketIOServer) => {
    client.on('challenge-pass', (payload: { token: string, type: string }) => {
        console.log('> Desafio recibido: ', payload)
        io.emit('general-notice', payload); // Para todos
    });
};