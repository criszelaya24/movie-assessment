import express, { Response, Request } from 'express';
import AppRouter from './AppRouter';
import './controllers/RootController';
import './controllers/UserController';
import cookieSession from 'cookie-session';
const app = express();

app.use(express.json());
app.use(cookieSession({ keys: [ 'expressType' ] }));
app.use(AppRouter.getInstance());

app.all('*', (req:Request, res:Response) => {
    res.status(404).send({
        error: 'Route not found',
    });
});

export default app;