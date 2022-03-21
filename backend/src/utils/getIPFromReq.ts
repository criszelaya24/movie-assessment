import getRealIP from './getRealIP';
import { RequestWithHeaders } from '../interfaces/Request';

const getIPFromReq = (req:RequestWithHeaders):string|null => {
    if (!(req && req.headers))
        throw { message: 'req param should be an object with a key headers', code: 403 };

    const headerAvailables = [ 'x-web-for', 'x-forwarded-for', 'X-Forwarded-For' ];
    const isAvailableGetMethod = !!(req.get);

    for (const headerAvailable of headerAvailables) {
        if (isAvailableGetMethod) {
            const headerValue = req.get(headerAvailable);

            if (headerValue)
                return getRealIP(headerValue);
        }

        if (req.headers[headerAvailable])
            return getRealIP(req.headers[headerAvailable]);
    }

    return null;
};

export default getIPFromReq;