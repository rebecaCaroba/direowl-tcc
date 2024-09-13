import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333/api',
})

api.interceptors.request.use((config: any | undefined) => {
    const token = localStorage.getItem('token')

    if(token) {
        config.headers['Authorization'] =  token ? `Bearer ${token}` : '';
    }

    return config
})