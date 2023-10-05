import { Router, Request, Response } from 'express';
const homeRouter = Router();

homeRouter.get('/', (_req: Request, res: Response) => {
	res.send('Hello, World!');
});

export default homeRouter;
