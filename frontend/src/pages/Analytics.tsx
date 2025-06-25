import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarProps,
    XAxisProps,
    YAxisProps,
    TooltipProps,
    LegendProps,
    PieProps
} from 'recharts';

// Add type definitions for chart components
type ValueType = string | number | Array<string | number>;
type NameType = string | number;

interface ChartEntry {
    _id: string;
    totalDuration: number;
    color: string;
}

interface AnalyticsData {
    patterns: Array<{
        _id: string;
        subjects: Array<{
            name: string;
            duration: number;
            sessions: number;
        }>;
        totalDuration: number;
    }>;
    subjectTotals: Array<ChartEntry>;
    achievements: {
        totalStudyTime: number;
        longestStreak: number;
        gemCounts: Array<{
            _id: string;
            count: number;
        }>;
    };
}

export const Analytics: React.FC = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/analytics/patterns?timeframe=${timeframe}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data);
            setError(null);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAnalytics();
        }
    }, [token, timeframe]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchAnalytics}
                            className="mt-2 text-red-600 hover:text-red-800 underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const formatMinutes = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Study Analytics</h1>
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={() => setTimeframe('week')}
                            className={`px-4 py-2 rounded-lg ${timeframe === 'week'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setTimeframe('month')}
                            className={`px-4 py-2 rounded-lg ${timeframe === 'month'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Month
                        </button>
                    </div>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900">Total Study Time</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">
                            {formatMinutes(data.achievements.totalStudyTime)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900">Longest Streak</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">
                            {data.achievements.longestStreak} days
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900">Total Gems</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">
                            {data.achievements.gemCounts.reduce((acc, curr) => acc + curr.count, 0)}
                        </p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Daily Study Time */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Study Time</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.patterns}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis tickFormatter={(value: number) => `${Math.floor(value / 60)}h`} />
                                    <Tooltip
                                        formatter={(value: number) => formatMinutes(value)}
                                        labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
                                    />
                                    <Legend />
                                    <Bar dataKey="totalDuration" fill="#4F46E5" name="Study Time" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Subject Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Distribution</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.subjectTotals}
                                        dataKey="totalDuration"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={(entry: ChartEntry) =>
                                            `${entry._id} (${formatMinutes(entry.totalDuration)})`
                                        }
                                    >
                                        {data.subjectTotals.map((entry: ChartEntry) => (
                                            <Cell key={entry._id} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => formatMinutes(value)} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 