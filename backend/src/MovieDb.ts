import { default as MovieDbClient } from 'node-themoviedb';
import { BodyMoviesDb, MovieDbClass, NowPlaying, Detail } from './interfaces/MovieClient';

export default class MovieDb implements MovieDbClass {

    private movieDbClient:MovieDbClient;

    constructor() {
        this.movieDbClient = new MovieDbClient(process.env.MOVIE_API_KEY);
    }

    async getNowPlaying({ page, region }:BodyMoviesDb):Promise<NowPlaying> {
        const nowPlaying =  await this.movieDbClient.movie.getNowPlaying({
            query: { page, region },
        });

        return nowPlaying as NowPlaying;
    }

    async movieDetail(id:number):Promise<Detail> {
        const movie = await this.movieDbClient.movie.getDetails({
            pathParameters: {
                movie_id: id,
            },
        });

        return { ...movie.data };
    }

}