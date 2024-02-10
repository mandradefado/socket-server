import { Router, Request, Response } from 'express';

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

    response.json({
        status: true,
        body,
        from,
        id
    });
});

export default router;