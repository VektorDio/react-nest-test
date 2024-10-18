import axios from 'axios';

export const instance = axios.create({
    // baseURL: process.env.VITE_API_URL,
    baseURL: 'https://react-nest-test-backend.vercel.app'
})