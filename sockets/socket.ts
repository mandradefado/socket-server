import { Socket, Server as SocketIOServer } from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const usersConnected = new UserList();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersConnected.add(user);
};

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('* Cliente desconectado');
        usersConnected.removeUser(client.id);
    });
};

export const message = (client: Socket) => {
    client.on('message', (payload: { from: string, body: string, rut: string }) => {
        console.log('> Mensaje recibido: ', payload)
    });
};

export const challengePass = (client: Socket, io: SocketIOServer) => {
    client.on('challenge-pass', (payload: { token: string, type: string }) => {
        console.log('> Desafio recibido: ', payload)
        io.emit('general-notice', payload); // Para todos
    });
};

export const configUser = (client: Socket, io: SocketIOServer) => {
    client.on('config-user', (payload: { company: string }, callback: Function) => {
        usersConnected.updateCompany(client.id, payload.company);
        
        callback({
            status: true,
            message: `Usuario: ${payload.company}, configurado`
        })
    });
}