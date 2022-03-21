import fetch from 'node-fetch';
import { Country, CountryResponse } from '../interfaces/Country';

const APIGenericGeolocationAll = async (ip:string, geoLocationEndpoint:string):Promise<Country> => {
    if (!(ip && geoLocationEndpoint))
        throw { message: 'ip and geoLocation API are required', code: 403 };

    try {
        const responseAPI = await fetch(`${geoLocationEndpoint}/${ip}`);
        const jsonResponseAPI:CountryResponse = await responseAPI.json();
        const { data } = jsonResponseAPI;

        return data;
    } catch (error) {
        console.error('APIGenericGeolocationAll', error);

        throw { message: 'Error Connecting API location', code: 500 };
    }
};

export default APIGenericGeolocationAll;