import { Request, RequestHandler } from 'express';
import { IUserDocument as User } from '../interfaces/DatabaseModels';
import { CountryInfo } from './country';
export interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined },
}

export interface RequestWithHeaders extends Request {
    user: User,
    token: string,
    headers: {
        [key:string]: string
    },
    ipInfo: string,
    countryInfo: CountryInfo
}

export interface RouteHandlerDescriptor {
    value?: RequestHandler
}