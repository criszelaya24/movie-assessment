import { CountryAndIp, CountryInfo } from '../interfaces/country';
import { RequestWithHeadersAndBody } from '../interfaces/Request';

const setIpAndCountryInfoInReq = (req:RequestWithHeadersAndBody, { ipInfo, countryData }:CountryAndIp) => {
    const countryInfo:CountryInfo = {
        code: countryData?.country.iso_code || 'unknown',
        name: countryData?.country?.names || 'unknown',
        city: {
            name: {
                original: countryData?.city?.names?.en || 'unknown',
                ...countryData?.city?.names || {},
            },
        },
    };

    req['ipInfo'] = ipInfo;
    req['countryInfo'] = countryInfo;

    return req;
};

export default setIpAndCountryInfoInReq;