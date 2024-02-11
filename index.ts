import Server from "./classes/server";
import router from './routes/router'
import cors from 'cors';

const server = Server.instance;

server.app.use('/', router);

server.start(() => {
    console.log(`* Servidor corriendo en el puerto ${ server.port }`);
})