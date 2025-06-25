import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const Settings: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">
                Settings
            </h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {isDarkMode ? (
                            <MoonIcon className="w-6 h-6 text-gray-600 dark:text-dark-text" />
                        ) : (
                            <SunIcon className="w-6 h-6 text-gray-600 dark:text-dark-text" />
                        )}
                        <span className="text-gray-700 dark:text-dark-text">
                            Dark Mode
                        </span>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`
                            relative inline-flex h-6 w-11 items-center rounded-full
                            transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                            ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'}
                        `}
                    >
                        <span
                            className={`
                                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
                            `}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}; 