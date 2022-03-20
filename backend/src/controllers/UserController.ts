import { Response } from 'express';
import { RequestWithBody } from '../interfaces/Request';
import { post } from './decorators/routes';
import { controller } from './decorators/controller';
import User from '../models/User';
@controller('/users')
export class UserController {

    @post('')
    async register(req:RequestWithBody, res:Response):Promise<any> {
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();

            res.status(201).send({ user, token });
        } catch (e) {
            console.log('Error:', e);
        }
    }

}