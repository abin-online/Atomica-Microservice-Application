'use client'

import React, { useEffect, useState } from "react";

interface TimerProps {
    duration: number; // Duration in minutes
    onTimeUp: () => void;
    onElapsedTime: (elapsedTime: number) => void; // Callback for elapsed time
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, onElapsedTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(() => {
        const savedTime = localStorage.getItem("timer");
        return savedTime ? parseInt(savedTime, 10) : duration * 60;
    });

    useEffect(() => {
        if (timeRemaining <= 0) {
            localStorage.removeItem("timer"); // Clear timer from localStorage
            onElapsedTime(duration * 60); // Full duration used
            if (onTimeUp) onTimeUp(); // Trigger callback
            return; // Prevent the timer from starting
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                const newTime = prev - 1;
                localStorage.setItem("timer", newTime.toString()); // Update localStorage
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, [timeRemaining, onTimeUp, duration, onElapsedTime]);

    useEffect(() => {
        if (timeRemaining > 0 && timeRemaining !== duration * 60) {
            const elapsedTime = duration * 60 - timeRemaining;
            onElapsedTime(elapsedTime); // Pass elapsed time to the parent
        }
    }, [timeRemaining, duration, onElapsedTime]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="text-xl font-mono">
            ⏱ {formatTime(timeRemaining)}
        </div>
    );
};

export default Timer;
