import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StudyJarLogo from '../assets/study-jar-logo.svg';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E5E5E5] to-[#FFFFFF] dark:from-[#000000] dark:to-[#14213D]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <nav className="py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img
                                src={StudyJarLogo}
                                alt="Study-Jar logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-2xl font-bold text-[#FCA311] dark:text-[#FCA311]">
                                Study-Jar
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-[#14213D] dark:text-[#E5E5E5] hover:text-[#FCA311] dark:hover:text-[#FCA311] px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[#FCA311] text-[#000000] hover:bg-[#e38f0d] px-4 py-2 rounded-md text-sm font-medium"
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
                            <h1 className="text-4xl sm:text-5xl font-bold text-[#14213D] dark:text-white mb-6">
                                Turn Your Study Sessions Into
                                <span className="text-[#FCA311] dark:text-[#FCA311]"> Beautiful Gems</span>
                            </h1>
                            <p className="text-lg text-[#14213D] dark:text-[#E5E5E5] mb-8">
                                Track your progress, collect gems, and watch your jar fill up with your achievements.
                                Make studying more engaging and rewarding with Study-Jar.
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    to="/register"
                                    className="bg-[#FCA311] text-[#000000] hover:bg-[#e38f0d] px-8 py-3 rounded-lg text-lg font-medium"
                                >
                                    Start Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-[#000000] dark:text-[#FCA311] dark:hover:bg-[#FCA311] dark:hover:text-[#000000] px-8 py-3 rounded-lg text-lg font-medium"
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
                                <div className="bg-[#FFFFFF] dark:bg-[#14213D] rounded-2xl shadow-xl p-6 transform rotate-3">
                                    <div className="aspect-square relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#FCA311] to-[#E5E5E5] dark:from-[#14213D] dark:to-[#000000] rounded-xl" />
                                        <div className="absolute inset-4 bg-[#FFFFFF] dark:bg-[#14213D] rounded-lg shadow-lg p-4">
                                            <div className="h-full flex flex-col">
                                                <div className="flex-1 flex items-center justify-center">
                                                    <div className="w-32 h-32 relative">
                                                        <div className="absolute inset-0 bg-[#14213D] dark:bg-[#000000] rounded-full" />
                                                        <div className="absolute inset-4 bg-[#FCA311] dark:bg-[#FCA311] rounded-full" />
                                                        <div className="absolute inset-8 bg-[#FFFFFF] dark:bg-[#14213D] rounded-full flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-[#14213D] dark:text-[#FCA311]">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <h3 className="text-lg font-semibold text-[#14213D] dark:text-white">
                                                        Today's Progress
                                                    </h3>
                                                    <p className="text-sm text-[#14213D] dark:text-[#E5E5E5]">
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

                {/* About Section */}
                <div className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="w-full flex justify-center lg:justify-start">
                            <img
                                src="/Gemini_Generated_Image_eencf7eencf7eenc.png"
                                alt="Study-Jar illustration"
                                className="w-full max-w-md drop-shadow-xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-[#14213D] dark:text-white">
                                Why I Built Study-Jar
                            </h2>
                            <p className="text-lg text-[#14213D] dark:text-[#E5E5E5]">
                                As a computer science student, I'm a firm believer in using technology to solve real-world problems. I was an avid user of the Forest productivity app until a shift in its monetization model placed core features behind a new subscription paywall, frustrating many users including myself.
                            </p>
                            <p className="text-lg text-[#14213D] dark:text-[#E5E5E5]">
                                I saw this as an opportunity to apply my skills. I took the initiative to architect and build Study-jar, my own productivity application. My vision is to provide a powerful, user-centric, and completely free tool for students. Study-jar is my answer to a market need, and I am actively developing a feature roadmap, including a community leaderboard, to expand its capabilities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20">
                    <h2 className="text-3xl font-bold text-center text-[#14213D] dark:text-white mb-12">
                        Why Choose Study-Jar?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-[#FFFFFF] dark:bg-[#14213D] rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-[#FCA311] dark:bg-[#FCA311] rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⏱️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#14213D] dark:text-white mb-2">
                                Focus Timer
                            </h3>
                            <p className="text-[#14213D] dark:text-[#E5E5E5]">
                                Track your study sessions with our built-in timer and stay focused on your goals.
                            </p>
                        </div>
                        <div className="bg-[#FFFFFF] dark:bg-[#14213D] rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-[#FCA311] dark:bg-[#FCA311] rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💎</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#14213D] dark:text-white mb-2">
                                Gem Collection
                            </h3>
                            <p className="text-[#14213D] dark:text-[#E5E5E5]">
                                Convert your study time into beautiful gems and watch your collection grow.
                            </p>
                        </div>
                        <div className="bg-[#FFFFFF] dark:bg-[#14213D] rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-[#FCA311] dark:bg-[#FCA311] rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#14213D] dark:text-white mb-2">
                                Progress Tracking
                            </h3>
                            <p className="text-[#14213D] dark:text-[#E5E5E5]">
                                Monitor your study habits and achievements with detailed analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 