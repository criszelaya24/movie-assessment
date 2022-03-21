import { default  as jwt }  from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestWithHeadersAndBody } from '../interfaces/Request';
import User from '../models/User';
import { Token } from '../interfaces/DatabaseModels';
import sendError from '../utils/sendError';

const verify = (token:string):Token => {
    return jwt.verify(token, process.env.SECRET_WORD) as Token;
};

const auth = async (req:RequestWithHeadersAndBody, res:Response, next:NextFunction):Promise<void> => {
    try {
        const token:string = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) throw { message: 'Token is required', code: 401 };

        const decoded = verify(token);
        const user = await User.findOne({ '_id': decoded._id, 'tokens.token': token });

        if (!user) throw { message: 'User not found', code: 404 };

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        sendError(res, error);
    }
};

export default auth;