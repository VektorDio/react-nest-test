import axios from 'axios';

export const instance = axios.create({
    baseURL: import.meta.env.API_URL,
})