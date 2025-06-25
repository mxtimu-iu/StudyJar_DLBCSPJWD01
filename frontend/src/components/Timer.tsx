import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/solid';
import { useSession } from '../contexts/SessionContext';

interface TimerProps {
    subject: {
        name: string;
        color: string;
    };
    onComplete: () => void;
}

interface ProgressBarProps {
    value: number;
    text: string;
    styles?: any;
}

const ProgressBar = ({ value, text, styles }: ProgressBarProps) => (
    <CircularProgressbar value={value} text={text} styles={styles} />
);

export const Timer: React.FC<TimerProps> = ({ subject, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const { startSession, endSession } = useSession();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const start = useCallback(async () => {
        if (!isRunning) {
            try {
                await startSession(subject);
                setStartTime(new Date());
                setIsRunning(true);
            } catch (error) {
                console.error('Failed to start session:', error);
            }
        }
    }, [isRunning, subject, startSession]);

    const pause = () => {
        setIsRunning(false);
    };

    const stop = useCallback(async () => {
        if (startTime) {
            setIsRunning(false);
            const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
            setTimeLeft(duration);
            try {
                await endSession();
                // Wait a brief moment for the backend to process
                setTimeout(() => {
                    onComplete();
                }, 500);
            } catch (error) {
                console.error('Failed to end session:', error);
            }
        }
    }, [startTime, endSession, onComplete]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                if (startTime) {
                    const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
                    setTimeLeft(duration);
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, startTime]);

    const progress = timeLeft / 3600; // Progress relative to 1 hour

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48">
                <CircularProgressbar
                    value={progress * 100}
                    text={formatTime(timeLeft)}
                    styles={buildStyles({
                        textColor: subject.color,
                        pathColor: subject.color,
                        trailColor: '#E2E8F0',
                    })}
                />
            </div>

            <div className="flex space-x-4">
                {!isRunning ? (
                    <button
                        onClick={start}
                        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <PlayIcon className="w-6 h-6" />
                    </button>
                ) : (
                    <button
                        onClick={pause}
                        className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                    >
                        <PauseIcon className="w-6 h-6" />
                    </button>
                )}

                <button
                    onClick={stop}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    disabled={!startTime}
                >
                    <StopIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="text-lg font-medium text-gray-700">
                {subject.name}
            </div>
        </div>
    );
}; 