import React from 'react';
import { motion } from 'framer-motion';

interface GemProps {
    type: 'pebble' | 'gem' | 'crystal';
    color: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const gemVariants = {
    pebble: {
        points: '50% 0%, 80% 30%, 80% 70%, 50% 100%, 20% 70%, 20% 30%',
        scale: 0.8,
    },
    gem: {
        points: '50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%',
        scale: 1,
    },
    crystal: {
        points: '50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%',
        scale: 1.2,
    },
};

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
};

export const Gem: React.FC<GemProps> = ({
    type,
    color,
    size = 'md',
    className = '',
}) => {
    const variant = gemVariants[type];

    return (
        <motion.div
            className={`relative ${sizeClasses[size]} ${className}`}
            initial={{ scale: 0 }}
            animate={{ scale: variant.scale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
            >
                <polygon
                    points={variant.points}
                    fill={color}
                    className="gem-sparkle"
                    style={{
                        filter: `drop-shadow(0 0 4px ${color})`,
                    }}
                />
            </svg>
            {type === 'crystal' && (
                <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                            points={variant.points}
                            fill="white"
                            className="gem-sparkle"
                        />
                    </svg>
                </motion.div>
            )}
        </motion.div>
    );
}; 