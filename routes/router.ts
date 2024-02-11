import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (request: Request, response: Response) => {
    response.json({
        status: true,
        message: 'Todo OKILLED'
    });
});

router.post('/messages', (request: any, response: Response) => {

    const { body, from } = request.body;

    response.json({
        status: true,
        body,
        from
    });
});

router.post('/messages/:id', (request: any, response: Response) => {

    const { body, from } = request.body;
    const id = request.params.id;

    const server = Server.instance;
    server.io.in(id).emit('private-challenge', { from, body })

    response.json({
        status: true,
        body,
        from,
        id
    });
});

export default router;