import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

type Props = {
    minutes: number;
    size: number;
    strokeBgColor: string;
    strokeColor: string;
    strokeWidth: number;
    updateTimer: 'second' | 'minute';
};

export const CountdownTimer = ({
    minutes,
    size,
    strokeBgColor,
    strokeColor,
    strokeWidth,
    updateTimer,
}: Props) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 * 1000);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStrokeOffset, setCurrentStrokeOffset] = useState(0);

    const milliseconds = minutes * 60 * 1000;
    const radius = size / 2;
    const circumference = size * Math.PI;

    const intervalDuration = updateTimer === 'second' ? 1000 : 60 * 1000;

    const strokeDashoffset = useCallback(() => {
        if (isPlaying) {
            const calculatedOffset = circumference - (timeLeft / milliseconds) * circumference;
            return isNaN(calculatedOffset) ? 0 : calculatedOffset;
        }
        return currentStrokeOffset;
    }, [timeLeft, currentStrokeOffset, isPlaying, milliseconds, circumference]);

    useEffect(() => {
        let intervalId: number;
        const handleInterval = () => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - intervalDuration;

                if (newTimeLeft <= 1000) {
                    clearInterval(intervalId);
                    setIsPlaying(false);
                    setCurrentStrokeOffset(0);
                    return milliseconds;
                }

                if ((newTimeLeft / 1000) % 60 === 0) {
                    setCurrentStrokeOffset(strokeDashoffset());
                }

                return newTimeLeft;
            });
        };

        if (isPlaying) {
            intervalId = setInterval(handleInterval, intervalDuration);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isPlaying, timeLeft, milliseconds, strokeDashoffset, intervalDuration, updateTimer]);


    const startTimer = () => {
        setIsPlaying(true);
    };

    const pauseTimer = () => {
        setIsPlaying(false);
    };

    const timeDisplay = format(new Date(timeLeft), 'm:ss');

    return (
        <div>
            <div className="button-container">
                <button className="button" onClick={startTimer} disabled={isPlaying}>
                    START
                </button>
                <button className="button" onClick={pauseTimer} disabled={!isPlaying}>
                    PAUSE
                </button>
            </div>
            <figure
                className="countdown-container"
                style={{ '--countdown-size': `${size}px` } as React.CSSProperties}
            >
                <p className="countdown-text">{timeDisplay}</p>
                <svg className="countdown-svg">
                    <circle
                        cx={radius}
                        cy={radius}
                        r={radius}
                        fill="none"
                        stroke={strokeBgColor}
                        strokeWidth={strokeWidth}
                    ></circle>
                </svg>
                <svg className="countdown-svg">
                    <circle
                        strokeDasharray={circumference}
                        strokeDashoffset={currentStrokeOffset}
                        r={radius}
                        cx={radius}
                        cy={radius}
                        fill="none"
                        strokeLinecap="round"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                    ></circle>
                </svg>
            </figure>
        </div>
    );
};
