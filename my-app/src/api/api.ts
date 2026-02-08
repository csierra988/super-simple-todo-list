//handling axios and tokens
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const TOKEN_KEY = "accessToken";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

//user has been authenticated
export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

//user log out
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {"Content-Type": "application/json"},
});

//adds the JWT to the request
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export function isAxiosError(e: unknown): e is AxiosError {
    return axios.isAxiosError(e);
}