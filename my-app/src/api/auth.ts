//auth endpoint wrapper
import { api, setToken, clearToken } from "./api";

export type User = {
    username: string;
    name: string;
}; 

export async function login(username: string, password: string) {
    const res = await api.post<{token: string}>(
        "api/auth/authenticate",
        {username, password});
    setToken(res.data.token);
}

export async function signup(payload: {username: string; password: string; name: string}) {
    const res = await api.post<{token: string}>(
        "api/auth/register",
        payload);
    setToken(res.data.token);
}

export async function logout() {
    clearToken();
}

export async function me() {
    const res = await api.get<User>("api/auth/me");
    return res.data;
}