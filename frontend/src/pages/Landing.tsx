import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-dark-bg dark:to-dark-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <nav className="py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                Study-Jar
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl"
                        >
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Turn Your Study Sessions Into
                                <span className="text-indigo-600 dark:text-indigo-400"> Beautiful Gems</span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Track your progress, collect gems, and watch your jar fill up with your achievements.
                                Make studying more engaging and rewarding with Study-Jar.
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-lg text-lg font-medium"
                                >
                                    Start Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-dark-bg px-8 py-3 rounded-lg text-lg font-medium"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative flex justify-center lg:justify-end"
                        >
                            <div className="w-full max-w-md">
                                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 transform rotate-3">
                                    <div className="aspect-square relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-dark-bg dark:to-dark-card rounded-xl" />
                                        <div className="absolute inset-4 bg-white dark:bg-dark-card rounded-lg shadow-lg p-4">
                                            <div className="h-full flex flex-col">
                                                <div className="flex-1 flex items-center justify-center">
                                                    <div className="w-32 h-32 relative">
                                                        <div className="absolute inset-0 bg-indigo-100 dark:bg-dark-bg rounded-full" />
                                                        <div className="absolute inset-4 bg-indigo-200 dark:bg-dark-card rounded-full" />
                                                        <div className="absolute inset-8 bg-indigo-300 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-white">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Today's Progress
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        90 minutes studied
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Why Choose Study-Jar?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⏱️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Focus Timer
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Track your study sessions with our built-in timer and stay focused on your goals.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💎</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Gem Collection
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Convert your study time into beautiful gems and watch your collection grow.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Progress Tracking
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Monitor your study habits and achievements with detailed analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 