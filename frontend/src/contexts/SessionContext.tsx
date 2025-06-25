import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Session {
    _id: string;
    subject: {
        name: string;
        color: string;
    };
    duration: number;
    gemType: 'pebble' | 'gem' | 'crystal';
    startTime: string;
    endTime: string;
    completed: boolean;
}

interface SessionContextType {
    activeSession: Session | null;
    startSession: (subject: { name: string; color: string }) => Promise<void>;
    endSession: () => Promise<void>;
    getTodaySessions: () => Promise<Session[]>;
    getSessionsByRange: (start: Date, end: Date) => Promise<Session[]>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useAuth();
    const [activeSession, setActiveSession] = useState<Session | null>(null);

    const startSession = async (subject: { name: string; color: string }) => {
        if (!token) throw new Error('Not authenticated');

        const response = await axios.post(
            `${API_URL}/api/sessions/start`,
            { subject },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setActiveSession(response.data);
    };

    const endSession = async () => {
        if (!token || !activeSession) throw new Error('No active session');

        const response = await axios.post(
            `${API_URL}/api/sessions/end/${activeSession._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setActiveSession(null);
        return response.data;
    };

    const getTodaySessions = async () => {
        if (!token) throw new Error('Not authenticated');

        const response = await axios.get(`${API_URL}/api/sessions/today`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    };

    const getSessionsByRange = async (start: Date, end: Date) => {
        if (!token) throw new Error('Not authenticated');

        const response = await axios.get(`${API_URL}/api/sessions/range`, {
            params: {
                start: start.toISOString(),
                end: end.toISOString(),
            },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    };

    const value = {
        activeSession,
        startSession,
        endSession,
        getTodaySessions,
        getSessionsByRange,
    };

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}; 