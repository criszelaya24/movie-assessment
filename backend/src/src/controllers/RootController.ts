import { get } from './decorators/routes';
import { Response, Request } from 'express';
import { controller } from './decorators/controller';

@controller('')
export class RootController {

    @get('/')
    root(req: Request, res: Response):any {
        return res.status(200).send({ status: 'Connected!' });
    }

}