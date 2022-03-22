import { Request, RequestHandler } from 'express';
import { IUserDocument as User } from '../interfaces/DatabaseModels';
import { CountryInfo } from './country';
export interface RequestWithHeadersAndBody extends Request {
    user: User,
    token: string,
    headers: {
        [key:string]: string
    },
    ipInfo: string,
    countryInfo: CountryInfo,
    body: { [key: string]: string | undefined },
}

export interface RouteHandlerDescriptor {
    value?: RequestHandler
}