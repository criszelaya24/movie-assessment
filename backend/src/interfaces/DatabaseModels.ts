import { Document } from 'mongoose';
import { Model } from 'mongoose';

export interface Token extends Document {
    _id?: string,
    token: string
}

export interface IUserDocument extends Document {
    _id: string,
    name: string,
    age: number,
    email: string,
    tokens: Token[],
    password: string,
    favoritesMovies?: number[]
    generateAuthToken: () => Token
    // eslint-disable-next-line no-unused-vars
    markFavoriteMovie: (id:number) => number
}

export interface UserStaticModel extends Model<IUserDocument> {
    // eslint-disable-next-line no-unused-vars
    findByCredentials(email: string, password:string): IUserDocument;
}