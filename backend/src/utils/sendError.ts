import { Error } from '../interfaces/Error';
import { Response } from 'express';
const sendError = (res: Response, error:Error):any => {
    if ([ 'ValidationError' ].includes(error.name)) {
        const errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });

        return res.status(400).send({ error: errors });
    }

    return res.status(error?.code || 500).send({
        error: error.message || error || 'App Crashed',
    });
};

export default sendError;