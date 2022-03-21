import { Response } from 'express';
import { RequestWithHeadersAndBody } from '../interfaces/Request';
import { get, post } from './decorators/routes';
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
    async releasedMovies (req:RequestWithHeadersAndBody, res:Response):Promise<any> {
        try {
            const page:number = Number(req?.query?.page || defaultPage);
            const region:string = req?.countryInfo?.code || defaultRegion;
            const nowMovies = await movieClient.getNowPlaying({ page, region });

            res.send({ data: nowMovies.data });
        } catch (error) {
            sendError(res, error);
        }
    }

    @post('/favorites')
    @use(auth)
    async markAsFavorite (req:RequestWithHeadersAndBody, res:Response):Promise<any> {
        try {
            const { user } = req;
            const { id } = req.body;

            if (!id) throw { code: 406, message: 'ID from movie is required' };

            user.markFavoriteMovie(Number(id));
            res.send({ data: id });
        } catch (error) {
            sendError(res, error);
        }
    }

}