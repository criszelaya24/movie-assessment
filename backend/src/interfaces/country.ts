interface CommonNames {
    [key:string]: string
}
export interface Country {
    city: {
        names: CommonNames
    }
    country: CommonNames
}

export interface CountryResponse {
    data?: Country
}

export interface CountryAndIp {
    ipInfo: string,
    countryData: Country
}

export interface CountryInfo {
    code: string,
    name: string,
    city: {
        name: {
            [key:string]: string
        }
    }
}