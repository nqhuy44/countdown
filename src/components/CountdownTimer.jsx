import { useState, useEffect, useMemo } from 'react';
import '../styles/main.css';

const CountdownTimer = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(), targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeLeft(new Date(), targetDate);
            setTimeLeft(remaining);

            if (remaining.total <= 0) {
                onComplete();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    // Helper function for display
    const addLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const timeUnits = [
        { label: 'Months', value: timeLeft.months },
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="countdown-wrapper glass">
            {timeUnits.map((unit, index) => (
                <div key={index} className="time-segment">
                    <div className="time-value flicker-in">
                        {addLeadingZero(unit.value)}
                    </div>
                    <div className="time-label">{unit.label}</div>
                </div>
            ))}
        </div>
    );
};

// Logic to calculate time including Months
function calculateTimeLeft(now, target) {
    const total = target - now;
    if (total <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

    let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());

    // Check if we haven't reached the target day of the month
    let currentWithMonths = new Date(now);
    currentWithMonths.setMonth(now.getMonth() + months);

    // If adding calculated months overshoots the target, subtract one month
    if (currentWithMonths > target) {
        months--;
        currentWithMonths = new Date(now);
        currentWithMonths.setMonth(now.getMonth() + months);
    }

    // Calculate remaining time after months account for
    const diff = target - currentWithMonths;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { months, days, hours, minutes, seconds, total };
}

export default CountdownTimer;
