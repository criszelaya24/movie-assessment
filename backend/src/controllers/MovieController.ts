import { Response } from 'express';
import { RequestWithHeaders } from '../interfaces/Request';
import { get } from './decorators/routes';
import { controller } from './decorators/controller';
import { use } from './decorators/use';
import auth from '../middlewares/auth';
import sendError from '../utils/sendError';
import { default as MovieDbClient } from 'node-themoviedb';
const mdb = new MovieDbClient(process.env.MOVIE_API_KEY);
const defaultPage:number = 1;
const defaultRegion:string = 'US';

@controller('/movies')
export class MovieController {

    @get('/now-released')
    @use(auth)
    async releasedMovies (req:RequestWithHeaders, res:Response):Promise<any> {
        try {
            const page:number = Number(req?.query?.page || defaultPage);
            const region:string = String(req?.query?.region || defaultRegion);
            const nowMovies = await mdb.movie.getNowPlaying({ query: { page, region } });

            res.send({ data: nowMovies.data });
        } catch (error) {
            sendError(res, error);
        }
    }

}