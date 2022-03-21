import { Response } from 'express';
import { RequestWithHeaders } from '../interfaces/Request';
import { get } from './decorators/routes';
import { controller } from './decorators/controller';
import { use } from './decorators/use';
import auth from '../middlewares/auth';
import country from '../middlewares/country';
import sendError from '../utils/sendError';
import MovieDb from '../MovieDb';
const movieClient = new MovieDb();
const defaultPage:number = 1;
const defaultRegion:string = 'US';

@controller('/movies')
export class MovieController {

    @get('/now-released')
    @use(auth)
    @use(country)
    async releasedMovies (req:RequestWithHeaders, res:Response):Promise<any> {
        try {
            const page:number = Number(req?.query?.page || defaultPage);
            const region:string = req?.countryInfo?.code || defaultRegion;
            const nowMovies = await movieClient.getNowPlaying({ page, region });

            res.send({ data: nowMovies.data });
        } catch (error) {
            sendError(res, error);
        }
    }

}