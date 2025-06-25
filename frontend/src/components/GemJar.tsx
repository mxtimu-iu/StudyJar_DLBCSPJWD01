import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gem } from './Gem';

interface GemData {
    type: 'pebble' | 'gem' | 'crystal';
    subject: {
        name: string;
        color: string;
    };
}

interface GemJarProps {
    gems: GemData[];
    progress: number; // 0 to 1
    className?: string;
}

export const GemJar: React.FC<GemJarProps> = ({
    gems,
    progress,
    className = '',
}) => {
    const positions = useMemo(() => {
        // Calculate positions for gems in a jar-like shape
        return gems.map((_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const offset = row % 2 ? 15 : 0;

            return {
                x: col * 30 + offset + Math.random() * 10 - 5,
                y: 80 - row * 25 + Math.random() * 10 - 5,
            };
        });
    }, [gems]);

    return (
        <div className={`relative ${className}`}>
            <svg
                viewBox="0 0 100 120"
                className="w-full max-w-md mx-auto"
            >
                <defs>
                    {/* Clip path for the jar */}
                    <clipPath id="jarClip">
                        <path d="M20,30 C20,20 80,20 80,30 L90,110 C90,115 10,115 10,110 L20,30" />
                    </clipPath>

                    {/* Water gradient */}
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0.9 }} />
                        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
                    </linearGradient>
                </defs>

                {/* Jar outline */}
                <path
                    d="M20,30 C20,20 80,20 80,30 L90,110 C90,115 10,115 10,110 L20,30"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="1"
                    className="opacity-50"
                />

                {/* Jar neck */}
                <path
                    d="M30,30 C30,25 70,25 70,30"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="1"
                    className="opacity-50"
                />

                {/* Water */}
                <g clipPath="url(#jarClip)">
                    {/* Base water level */}
                    <motion.path
                        d={`M20,${110 - progress * 80} 
                           C20,${106 - progress * 80} 
                             35,${114 - progress * 80} 
                             50,${110 - progress * 80} 
                             65,${106 - progress * 80} 
                             80,${114 - progress * 80} 
                             80,${110 - progress * 80} 
                           L90,110 
                           C90,115 10,115 10,110 
                           L20,${110 - progress * 80}`}
                        fill="url(#waterGradient)"
                        animate={{
                            d: [
                                `M20,${110 - progress * 80} 
                                 C20,${106 - progress * 80} 
                                   35,${114 - progress * 80} 
                                   50,${110 - progress * 80} 
                                   65,${106 - progress * 80} 
                                   80,${114 - progress * 80} 
                                   80,${110 - progress * 80} 
                                 L90,110 
                                 C90,115 10,115 10,110 
                                 L20,${110 - progress * 80}`,
                                `M20,${110 - progress * 80} 
                                 C20,${114 - progress * 80} 
                                   35,${106 - progress * 80} 
                                   50,${110 - progress * 80} 
                                   65,${114 - progress * 80} 
                                   80,${106 - progress * 80} 
                                   80,${110 - progress * 80} 
                                 L90,110 
                                 C90,115 10,115 10,110 
                                 L20,${110 - progress * 80}`
                            ]
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.2,
                            ease: "easeInOut"
                        }}
                    />
                </g>

                {/* Gems */}
                <g>
                    {gems.map((gem, index) => (
                        <motion.g
                            key={index}
                            initial={{ scale: 0, y: -50 }}
                            animate={{
                                scale: 1,
                                x: positions[index].x,
                                y: positions[index].y,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 20,
                                delay: index * 0.1,
                            }}
                        >
                            <Gem
                                type={gem.type}
                                color={gem.subject.color}
                                size="sm"
                            />
                        </motion.g>
                    ))}
                </g>

                {/* Jar lid */}
                <path
                    d="M25,25 C25,20 75,20 75,25"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="1"
                    className="opacity-50"
                />
            </svg>

            {/* Sparkles */}
            {progress >= 1 && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}; 