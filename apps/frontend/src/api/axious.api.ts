import axios from 'axios';

export const instance = axios.create({
    //baseURL: import.meta.env.API_URL,
    baseURL: 'react-nest-test-backend.vercel.app'
})