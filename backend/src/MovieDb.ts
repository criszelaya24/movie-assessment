import { default as MovieDbClient } from 'node-themoviedb';
import { BodyMoviesDb, MovieDbClass, NowPlaying } from './interfaces/MovieClient';

export default class MovieDb implements MovieDbClass {

    private movieDbClient:MovieDbClient;

    constructor() {
        this.movieDbClient = new MovieDbClient(process.env.MOVIE_API_KEY);
    }

    async getNowPlaying({ page, region }:BodyMoviesDb) {
        const nowPlaying =  await this.movieDbClient.movie.getNowPlaying({
            query: { page, region },
        });

        return nowPlaying as NowPlaying;
    }

}