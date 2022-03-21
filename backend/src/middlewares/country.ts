import { Response, NextFunction } from 'express';
import { RequestWithHeaders } from '../interfaces/Request';
import { CountryAndIp } from '../interfaces/Country';
import APIGenericGeolocationAll from '../utils/APIGenericGeolocationAll';
import getIPFromReq from '../utils/getIPFromReq';
import sendError from '../utils/sendError';
import setIpAndCountryInfoInReq from '../utils/setIpAndCountryInfoInReq';

const country = async(req:RequestWithHeaders, res:Response, next:NextFunction):Promise<void> => {
    try {
        const IPFromReq = getIPFromReq(req);
        const countryData = await APIGenericGeolocationAll(
            IPFromReq, process.env.GEOLOCATION_API,
        );
        const ipAndCountryInfo:CountryAndIp = { ipInfo: IPFromReq, countryData };

        setIpAndCountryInfoInReq(req, ipAndCountryInfo);

        next();
    } catch (error) {
        sendError(res, error);
    }
};

export default country;