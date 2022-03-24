import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_MOVIE_DB_SERVER,
    headers: { 'Access-Control-Allow-Origin': '*'}

});

export default instance;