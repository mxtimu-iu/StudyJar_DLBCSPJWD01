import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!user) return null;

    return (
        <nav className={`
            fixed top-0 left-0 right-0 z-50
            bg-white dark:bg-dark-card
            transition-all duration-200
            ${isScrolled ? 'shadow-lg' : 'shadow'}
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Study-Jar</span>
                        </div>
                        {/* Desktop Menu */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/dashboard"
                                className={`${location.pathname === '/dashboard'
                                    ? 'border-indigo-500 text-gray-900 dark:text-dark-text'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/analytics"
                                className={`${location.pathname === '/analytics'
                                    ? 'border-indigo-500 text-gray-900 dark:text-dark-text'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Analytics
                            </Link>
                        </div>
                    </div>
                    {/* Desktop User Menu */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg"
                        >
                            {isDarkMode ? (
                                <SunIcon className="h-6 w-6" />
                            ) : (
                                <MoonIcon className="h-6 w-6" />
                            )}
                        </button>
                        <Link
                            to="/settings"
                            className={`${location.pathname === '/settings'
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                } px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={logout}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        to="/dashboard"
                        className={`${location.pathname === '/dashboard'
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-dark-bg dark:border-dark-bg dark:text-dark-text'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-dark-bg dark:hover:border-dark-bg dark:hover:text-dark-text'
                            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/analytics"
                        className={`${location.pathname === '/analytics'
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-dark-bg dark:border-dark-bg dark:text-dark-text'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-dark-bg dark:hover:border-dark-bg dark:hover:text-dark-text'
                            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Analytics
                    </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">{user.username}</div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                logout();
                            }}
                            className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}; 