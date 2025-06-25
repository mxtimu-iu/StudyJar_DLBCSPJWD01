import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    subjects: Array<{
        name: string;
        color: string;
    }>;
    dailyGoal: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUserSettings: (settings: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get(`${API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setUser(response.data.user);
                    setToken(storedToken);
                } catch (error) {
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password,
        });
        const { token: newToken, user: userData } = response.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const register = async (username: string, email: string, password: string) => {
        const response = await axios.post(`${API_URL}/api/auth/register`, {
            username,
            email,
            password,
        });
        const { token: newToken, user: userData } = response.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateUserSettings = async (settings: Partial<User>) => {
        if (!token) throw new Error('Not authenticated');

        const response = await axios.patch(
            `${API_URL}/api/auth/settings`,
            settings,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setUser(response.data.user);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUserSettings,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 