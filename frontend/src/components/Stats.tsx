import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useSession } from '../contexts/SessionContext';
import { Gem } from './Gem';

interface StatsProps {
    className?: string;
}

export const Stats: React.FC<StatsProps> = ({ className = '' }) => {
    const { getTodaySessions } = useSession();
    const [todayStats, setTodayStats] = useState<{
        totalDuration: number;
        sessions: number;
        gems: Array<{
            type: 'pebble' | 'gem' | 'crystal';
            subject: { name: string; color: string };
        }>;
    }>({
        totalDuration: 0,
        sessions: 0,
        gems: [],
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const sessions = await getTodaySessions();
                const stats = sessions.reduce(
                    (acc, session) => ({
                        totalDuration: acc.totalDuration + session.duration,
                        sessions: acc.sessions + 1,
                        gems: [
                            ...acc.gems,
                            {
                                type: session.gemType,
                                subject: session.subject,
                            },
                        ],
                    }),
                    { totalDuration: 0, sessions: 0, gems: [] as any[] }
                );
                setTodayStats(stats);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, [getTodaySessions]);

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Progress</h2>

            <div className="flex justify-between gap-4 mb-6">
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-blue-100 rounded-lg text-center p-2">
                    <div className="text-blue-600 text-2xl">
                        <ClockIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap">Total Time</p>
                    <p className="text-xl font-bold">{formatDuration(todayStats.totalDuration)}</p>
                </div>

                <div className="flex flex-col items-center justify-center w-24 h-24 bg-green-100 rounded-lg text-center p-2">
                    <div className="text-green-600 text-2xl">
                        <ChartBarIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap">Sessions</p>
                    <p className="text-xl font-bold">{todayStats.sessions}</p>
                </div>

                <div className="flex flex-col items-center justify-center w-24 h-24 bg-yellow-100 rounded-lg text-center p-2">
                    <div className="text-yellow-600 text-2xl">
                        <FireIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap">Gems</p>
                    <p className="text-xl font-bold">{todayStats.gems.length}</p>
                </div>
            </div>

            <div className="card p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Today's Gems
                </h3>
                <div className="flex flex-wrap gap-4">
                    {todayStats.gems.map((gem, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                            title={`${gem.subject.name} - ${gem.type}`}
                        >
                            <Gem
                                type={gem.type}
                                color={gem.subject.color}
                                size="sm"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 