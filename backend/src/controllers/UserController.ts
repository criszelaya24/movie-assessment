import { Response } from 'express';
import { RequestWithHeadersAndBody } from '../interfaces/Request';
import { post, del } from './decorators/routes';
import { controller } from './decorators/controller';
import { use } from './decorators/use';
import User from '../models/User';
import auth from '../middlewares/auth';
import sendError from '../utils/sendError';
@controller('/users')
export class UserController {

    @post('/register')
    async register(req:RequestWithHeadersAndBody, res:Response):Promise<any> {
        try {
            const user = new User(req.body);

            await user.save();
            const token = await user.generateAuthToken();

            res.status(201).send({ user, token });
        } catch (e) {
            return sendError(res, e);
        }
    }

    @post('/login')
    async postLogin(req:RequestWithHeadersAndBody, res:Response):Promise<any> {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);

            const token = await user.generateAuthToken();

            res.send({ user, token });
        } catch (e) {
            sendError(res, e);
        }
    }

    @del('/logout')
    @use(auth)
    async logout(req:RequestWithHeadersAndBody, res:Response):Promise<any> {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send({ data: true });
    }

}