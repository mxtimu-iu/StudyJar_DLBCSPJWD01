import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface DailyProgressProps {
    onGoalUpdate?: (goal: number) => void;
}

interface DailyProgressData {
    progress: {
        totalMinutes: number;
        goalAchieved: boolean;
        sessions: any[];
    };
    dailyGoal: number;
    streak: number;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ onGoalUpdate }) => {
    const [data, setData] = useState<DailyProgressData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [newGoal, setNewGoal] = useState('');
    const { token } = useAuth();

    const fetchProgress = async () => {
        try {
            console.log('Fetching daily progress...');
            const response = await axios.get('http://localhost:5000/api/daily-progress/today', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Received response:', response.data);
            setData(response.data);
            if (onGoalUpdate) {
                onGoalUpdate(response.data.dailyGoal);
            }
            setError(null);
        } catch (error: any) {
            console.error('Error fetching daily progress:', error);
            setError(error.response?.data?.message || 'Failed to load progress');
            setData(null);
        }
    };

    useEffect(() => {
        if (token) {
            fetchProgress();
            const interval = setInterval(fetchProgress, 60000);
            return () => clearInterval(interval);
        }
    }, [token]);

    const updateDailyGoal = async () => {
        try {
            await axios.put('http://localhost:5000/api/daily-progress/goal',
                { dailyGoal: parseInt(newGoal) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            await fetchProgress();
            setIsEditingGoal(false);
        } catch (error: any) {
            console.error('Error updating daily goal:', error);
            setError(error.response?.data?.message || 'Failed to update goal');
        }
    };

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchProgress}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const progress = (data.progress.totalMinutes / data.dailyGoal) * 100;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Daily Progress</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-indigo-600">
                        🔥 {data.streak} day streak
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-200 rounded-full mb-4">
                <motion.div
                    className="absolute h-full bg-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{data.progress.totalMinutes} minutes today</span>
                <div className="flex items-center">
                    {isEditingGoal ? (
                        <>
                            <input
                                type="number"
                                className="w-16 px-2 py-1 border rounded mr-2"
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                min="1"
                            />
                            <button
                                onClick={updateDailyGoal}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <span>Goal: {data.dailyGoal} minutes</span>
                            <button
                                onClick={() => {
                                    setNewGoal(data.dailyGoal.toString());
                                    setIsEditingGoal(true);
                                }}
                                className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                                ✏️
                            </button>
                        </>
                    )}
                </div>
            </div>

            {data.progress.goalAchieved && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center"
                >
                    🎉 Daily goal achieved! Keep going!
                </motion.div>
            )}
        </div>
    );
}; 