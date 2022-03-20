import { Request, RequestHandler } from 'express';
import { IUserDocument as User } from '../interfaces/DatabaseModels';
export interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined },
}

export interface RequestWithHeaders extends Request {
    user: User,
    token: string
}

export interface RouteHandlerDescriptor {
    value?: RequestHandler
}