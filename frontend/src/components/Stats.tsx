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
            <h2 className="text-2xl font-bold text-[#14213D] dark:text-[#FFFFFF] mb-6">Today's Progress</h2>

            <div className="flex justify-between gap-4 mb-6">
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-[#E5E5E5] dark:bg-[#000000] rounded-lg text-center p-2">
                    <div className="text-[#14213D] dark:text-[#FCA311] text-2xl">
                        <ClockIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap text-[#14213D] dark:text-[#E5E5E5]">Total Time</p>
                    <p className="text-xl font-bold text-[#14213D] dark:text-[#FFFFFF]">{formatDuration(todayStats.totalDuration)}</p>
                </div>

                <div className="flex flex-col items-center justify-center w-24 h-24 bg-[#E5E5E5] dark:bg-[#000000] rounded-lg text-center p-2">
                    <div className="text-[#14213D] dark:text-[#FCA311] text-2xl">
                        <ChartBarIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap text-[#14213D] dark:text-[#E5E5E5]">Sessions</p>
                    <p className="text-xl font-bold text-[#14213D] dark:text-[#FFFFFF]">{todayStats.sessions}</p>
                </div>

                <div className="flex flex-col items-center justify-center w-24 h-24 bg-[#E5E5E5] dark:bg-[#000000] rounded-lg text-center p-2">
                    <div className="text-[#14213D] dark:text-[#FCA311] text-2xl">
                        <FireIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap text-[#14213D] dark:text-[#E5E5E5]">Gems</p>
                    <p className="text-xl font-bold text-[#14213D] dark:text-[#FFFFFF]">{todayStats.gems.length}</p>
                </div>
            </div>

            <div className="card p-4 bg-[#FFFFFF] dark:bg-[#14213D] rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-[#14213D] dark:text-[#FFFFFF] mb-4">
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