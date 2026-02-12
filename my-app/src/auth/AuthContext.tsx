//check if user is logged in on load
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { clearToken, isAxiosError } from "../api/api";

type AuthState = {
    user: authApi.User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (payload: {username: string, password: string, name: string}) => Promise<void>;
    logout: () => Promise<void>;
    refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<authApi.User | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshMe() {
        try {
            const me = await authApi.me();
            setUser(me);
        } catch (error) {
            if (isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                clearToken();
                setUser(null);
            }
            else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshMe();
    }, []);


    async function login(username: string, password: string) {
        await authApi.login(username, password);
        await refreshMe();
    }

    async function signup(payload: {username: string; password: string; name: string;} ) {
        await authApi.signup(payload);
        await refreshMe();
    }

    async function logout() {
        await authApi.logout();
        setUser(null);
    }

    return (
        <>
        <AuthContext.Provider value={{user, loading, login, signup, logout, refreshMe}}>
            {children}
        </AuthContext.Provider>
        </>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be inside AuthProvide");
    }
    return ctx;
}
