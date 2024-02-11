import express from 'express';
import { SERVER_PORT, URL_CLIENT } from '../global/environment';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

import * as configSocket from '../sockets/socket';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: SocketIOServer;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.app.use(express.json());

        this.httpServer = new http.Server(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: URL_CLIENT,
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this.onSockets();
    }

    public static get instance() { // Patrón singleton
        return this._instance || (this._instance = new this());
    }

    private onSockets() {
        console.log('* Escuchando conexiones');
        this.io.on('connection', client => {
            configSocket.connectClient(client);
            configSocket.configUser(client, this.io);

            configSocket.disconnect(client);
            configSocket.challengePass(client, this.io);
        })
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}