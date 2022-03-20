import { Document } from 'mongoose';

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
    generateAuthToken: () => Token
}