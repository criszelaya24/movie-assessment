const getRealIP = (stringIp:string):string => {
    if (typeof stringIp === 'string')
        return stringIp.split(',')[0];

    throw { message: 'stringIp param must be a string', code: 403 };
};

export default getRealIP;