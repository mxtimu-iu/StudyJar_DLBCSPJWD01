import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SubjectPickerProps {
    onSelect: (subject: { name: string; color: string }) => void;
    selectedSubject?: { name: string; color: string } | null;
}

export const SubjectPicker: React.FC<SubjectPickerProps> = ({
    onSelect,
    selectedSubject,
}) => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {user.subjects.map((subject) => (
                <button
                    key={subject.name}
                    onClick={() => onSelect(subject)}
                    className={`
                        p-3 rounded-lg transition-all duration-200
                        flex items-center justify-center min-h-[80px]
                        ${selectedSubject?.name === subject.name
                            ? 'ring-2 ring-offset-2 scale-105'
                            : 'hover:scale-105'
                        }
                    `}
                    style={{
                        backgroundColor: `${subject.color}15`,
                        borderColor: subject.color,
                        borderWidth: '2px',
                        color: subject.color,
                    }}
                >
                    <div className="font-medium text-center break-words w-full">
                        {subject.name}
                    </div>
                </button>
            ))}
        </div>
    );
}; 