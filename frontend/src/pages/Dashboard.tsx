import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSession } from '../contexts/SessionContext';
import { Timer } from '../components/Timer';
import { GemJar } from '../components/GemJar';
import { SubjectPicker } from '../components/SubjectPicker';
import { DailyProgress } from '../components/DailyProgress';
import { Stats } from '../components/Stats';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { getTodaySessions } = useSession();
    const [selectedSubject, setSelectedSubject] = useState<{
        name: string;
        color: string;
    } | null>(null);
    const [todayGems, setTodayGems] = useState<
        Array<{
            type: 'pebble' | 'gem' | 'crystal';
            subject: { name: string; color: string };
            duration: number;
        }>
    >([]);
    const [dailyGoal, setDailyGoal] = useState(120); // Default 2 hours

    useEffect(() => {
        const fetchTodayGems = async () => {
            try {
                const sessions = await getTodaySessions();
                const gems = sessions.map((session) => ({
                    type: session.gemType,
                    subject: session.subject,
                    duration: session.duration
                }));
                setTodayGems(gems);
            } catch (error) {
                console.error('Failed to fetch today\'s gems:', error);
            }
        };

        fetchTodayGems();
    }, [getTodaySessions]);

    const handleSessionComplete = async () => {
        const sessions = await getTodaySessions();
        const gems = sessions.map((session) => ({
            type: session.gemType,
            subject: session.subject,
            duration: session.duration
        }));
        setTodayGems(gems);
        setSelectedSubject(null);
    };

    if (!user) return null;

    const totalMinutes = todayGems.reduce((acc, gem) => acc + gem.duration, 0);
    const progress = Math.min(totalMinutes / dailyGoal, 1);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <DailyProgress onGoalUpdate={setDailyGoal} />
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Study Timer
                        </h2>
                        {selectedSubject ? (
                            <div className="flex flex-col items-center space-y-6">
                                <Timer
                                    subject={selectedSubject}
                                    onComplete={handleSessionComplete}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-8">
                                <div className="flex flex-col items-center space-y-2">
                                    <h3 className="text-lg font-medium text-gray-700 text-center">
                                        Select a subject to start studying
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                        Choose a subject to begin your study session
                                    </p>
                                </div>
                                <div className="w-full max-w-md bg-gray-50 rounded-lg p-4">
                                    <SubjectPicker
                                        onSelect={setSelectedSubject}
                                        selectedSubject={selectedSubject}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Today's Jar
                        </h2>
                        <div className="flex flex-col items-center justify-between h-full">
                            <div className="aspect-square w-full max-w-md">
                                <GemJar
                                    gems={todayGems}
                                    progress={progress}
                                    className="h-full"
                                />
                            </div>
                            <div className="mt-6 text-center text-gray-600">
                                {progress < 1
                                    ? `${Math.round(progress * 100)}% full (${totalMinutes}/${dailyGoal} minutes)`
                                    : 'Jar is full! 🎉'}
                            </div>
                        </div>
                    </div>
                    <Stats />
                </div>
            </div>
        </div>
    );
}; 