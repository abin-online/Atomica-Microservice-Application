'use client'

import React, { useState, useEffect } from 'react'
import { getStreak } from '@/api/badge'

const StreakCalendar = ({ completedDates, currentMonth, streak }: { completedDates: string[], currentMonth: number, streak: { current: number, highest: number } }) => {
    const getDaysInMonth = (month: number) => {
        return new Date(2025, month + 1, 0).getDate();
    };

    const generateMonthGrid = () => {
        const totalDays = getDaysInMonth(currentMonth);
        const rows: any[] = [];
        
        for (let i = 1; i <= totalDays; i++) {
            rows.push(i);
        }
        
        return rows;
    };

    const isCompleted = (date: number) => {
        const currentYear = new Date().getFullYear();
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

        return completedDates.some((completedDateStr) => {
            const completedDate = new Date(completedDateStr);
            const completedDateFormatted = `${completedDate.getFullYear()}-${(completedDate.getMonth() + 1).toString().padStart(2, '0')}-${completedDate.getDate().toString().padStart(2, '0')}`;
            return completedDateFormatted === dateStr;
        });
    };

    return (
        <div className="grid grid-cols-7 gap-1">
            {generateMonthGrid().map((day) => (
                <div
                    key={day}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-medium transition-transform transform rounded-lg shadow-sm
                        ${isCompleted(day) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                        ${streak.current && day === new Date().getDate() ? 'ring-4 ring-yellow-500 transform scale-105' : ''}
                        hover:scale-110 hover:bg-green-400 hover:ring-2 hover:ring-green-600`}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};

const Streak = () => {
    const [completedDates, setCompletedDates] = useState<string[]>([]);
    const [streak, setStreak] = useState<{ current: number, highest: number }>({ current: 0, highest: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // Default to the current month
    const [year, setYear] = useState<number>(new Date().getFullYear()); // Default to current year

    // Get the data for the selected month
    useEffect(() => {
        const fetchStreak = async () => {
            setLoading(true);
            try {
                const response: any = await getStreak({ year, month: currentMonth });
                const data = response.data;
                
                setCompletedDates(data.completed.map((item: any) => item.submissionDate));
                setStreak(data.streak);
                setError(null); 
            } catch (err) {
                setError('Failed to load streak data');
                console.error('Error fetching streak data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStreak();
    }, [currentMonth, year]); // Trigger fetch when the month or year changes

    // Generate a list of months for the dropdown
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(e.target.value);
        setCurrentMonth(selectedMonth);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = parseInt(e.target.value);
        setYear(selectedYear);
    };

    return (
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-[900px] w-full h-auto self-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Streak</h2>

            {/* Dropdown for selecting month */}
            <div className="flex justify-between mb-4">
                <div>
                    <label htmlFor="month" className="mr-2 text-sm text-gray-600">Select Month:</label>
                    <select
                        id="month"
                        value={currentMonth}
                        onChange={handleMonthChange}
                        className="px-3 py-1 border rounded-md text-sm"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>

                {/* Dropdown for selecting year */}
                <div>
                    <label htmlFor="year" className="mr-2 text-sm text-gray-600">Select Year:</label>
                    <select
                        id="year"
                        value={year}
                        onChange={handleYearChange}
                        className="px-3 py-1 border rounded-md text-sm"
                    >
                        <option value={2025}>2025</option>
                        <option value={2024}>2024</option>
                        <option value={2023}>2023</option>
                        <option value={2022}>2022</option>
                        {/* Add more years as needed */}
                    </select>
                </div>
            </div>

            {loading && <p className="text-center text-gray-500">Loading streak data...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <StreakCalendar completedDates={completedDates} currentMonth={currentMonth} streak={streak} />
            )}

            <div className="mt-4 flex justify-between text-sm text-gray-700">
                <div>
                    <p>Current Streak: <span className="font-bold text-green-600">{streak.current} days</span></p>
                    <p>Highest Streak: <span className="font-bold text-blue-600">{streak.highest} days</span></p>
                </div>
            </div>
        </div>
    );
};

export default Streak;
