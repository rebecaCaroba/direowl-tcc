import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config: any | undefined) => {
    const token = localStorage.getItem('token')

    if(token) {
        config.headers['Authorization'] =  token ? `Bearer ${token}` : '';
    }

    return config
})