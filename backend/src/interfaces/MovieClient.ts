export interface BodyMoviesDb {
    page:number,
    region:string
}

export interface NowPlaying {
    data: any
}

export interface MovieDbClass {
    // eslint-disable-next-line no-unused-vars
    getNowPlaying(params:BodyMoviesDb): Promise<NowPlaying>
}