'use client'

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hook';
import { setAdmin } from '@/lib/features/users/adminSlice';
import { useRouter } from 'next/navigation';
import { FaSyncAlt } from 'react-icons/fa';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';
import { userList } from '@/api/contest';
import { leaderBoardFromBadgeService } from '@/api/badge';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Submission = {
    _id: {
        month: string;
        year: string;
    };
    count: number;
};

type LeaderboardEntry = {
    userName: string;
    totalPoints: number;
    contestCount: number;
};


type UserMcq = {
    _id: string;
    name: string;
    rightAnswers: number;
    points: number;
};

type UserProblem = {
    _id: string;
    name: string;
    solved: number;
    points: number;
};

const Dashboard: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');

    const [userMcq, setUserMcq] = useState<UserMcq[]>([]);
    const [userProblem, setUserProblem] = useState<UserProblem[]>([]);

    const [counts, setCounts] = useState({
        contestCount: 2,
        problemCount: 4,
        mcqCount: 6,
        userCount: 5,
    });

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            dispatch(setAdmin(JSON.parse(storedAdmin)));
        } else {
            router.push(`/admin`);
        }

        // const fetchCounts = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:5003/dashboard/stats');
        //         setCounts(response.data);
        //     } catch (error) {
        //         console.error('Error fetching counts:', error);
        //     }
        // };

        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                const filters = new URLSearchParams();
                if (year) filters.append('year', year);
                if (month) filters.append('month', month);
                const response = await axios.get<{ submissions: Submission[] }>(
                    `http://localhost:5003/badge/filter/submission?${filters.toString()}`
                );

                const data = response.data.submissions;
                if (Array.isArray(data)) {
                    setSubmissions(data);
                } else {
                    console.error('Expected an array for submissions, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        //fetchCounts();
        fetchSubmissions();
    }, [dispatch, router, year, month]);

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            try {
                const [response, responseForProblemAndMcq]: any = await Promise.all([userList(),
                    leaderBoardFromBadgeService()
                ]);
                setLeaderboard(response.data);
                setUserMcq(responseForProblemAndMcq.data.userMcq);
                setUserProblem(responseForProblemAndMcq.data.userProblem);
                console.log("responseForProblemAndMcq", responseForProblemAndMcq.data)
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderBoard();
    }, []);

    const chartData = {
        labels: submissions.map((submission) => `${submission._id.month}-${submission._id.year}`),
        datasets: [
            {
                label: 'Submissions Count',
                data: submissions.map((submission) => submission.count),
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Filtered Submissions Over Time',
                color: '#ffffff',
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `Submissions: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year-Month',
                    color: '#ffffff',
                },
                ticks: {
                    color: '#ffffff',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Submissions',
                    color: '#ffffff',
                },
                ticks: {
                    color: '#ffffff',
                },
                min: 0,
            },
        },
    };

    const resetFilters = () => {
        setYear('');
        setMonth('');
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Header />
            <Sidebar />
            <div className="flex-grow my-20 flex flex-col bg-gray-900 text-white p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div className="p-4 bg-blue-600 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold">Contests</h2>
                            <p className="text-2xl font-bold">{counts.contestCount}</p>
                        </div>
                        <div className="p-4 bg-green-600 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold">Problems</h2>
                            <p className="text-2xl font-bold">{counts.problemCount}</p>
                        </div>
                        <div className="p-4 bg-purple-600 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold">MCQs</h2>
                            <p className="text-2xl font-bold">{counts.mcqCount}</p>
                        </div>
                        <div className="p-4 bg-red-600 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold">Users</h2>
                            <p className="text-2xl font-bold">{counts.userCount}</p>
                        </div>
                    </div>

                    <div className="flex justify-start items-center space-x-4 mb-6">
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Year"
                            className="py-2 px-4 rounded-md bg-gray-700 text-white"
                        />
                        <input
                            type="number"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            placeholder="Month"
                            className="py-2 px-4 rounded-md bg-gray-700 text-white"
                        />
                        <button
                            onClick={() => setLoading(true)}
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={resetFilters}
                            className="py-2 px-6 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
                        >
                            Reset Filters
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <FaSyncAlt className="text-4xl animate-spin" />
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="chart-container mb-6" style={{ width: '100%', height: '400px' }}>
                            <Line
                                data={{
                                    labels: [],
                                    datasets: [
                                        {
                                            label: 'Submissions Count',
                                            data: [],
                                            borderColor: '#22c55e',
                                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                            fill: true,
                                            tension: 0.4,
                                        },
                                    ],
                                }}
                                options={options}
                            />
                        </div>
                    ) : (
                        <div className="chart-container mb-6" style={{ width: '100%', height: '400px' }}>
                            <Line data={chartData} options={options} />
                        </div>
                    )}

<div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Leaderboards</h2>
    <div className="grid grid-cols-3 gap-4">
        {/* Contest Leaderboard */}
        <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4 text-center">Contest Leaderboard</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                {leaderboard.length > 0 ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4 font-semibold">
                            <span>Username</span>
                            <span>Total Points</span>
                            <span>Contest Count</span>
                        </div>
                        {leaderboard.map((entry, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 gap-4 py-2 hover:bg-gray-600 rounded-lg"
                            >
                                <span>{entry.userName}</span>
                                <span className="text-green-400 font-bold">{entry.totalPoints}</span>
                                <span className="text-blue-400 font-bold">{entry.contestCount}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No data available for contests.</p>
                )}
            </div>
        </div>

        {/* MCQ Leaderboard */}
        <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4 text-center">MCQ Leaderboard</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                {userMcq.length > 0 ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4 font-semibold">
                            <span>Username</span>
                            <span>Right Answers</span>
                            <span>Total Points</span>
                        </div>
                        {userMcq.map((user, index) => (
                            <div
                                key={user._id}
                                className="grid grid-cols-3 gap-4 py-2 hover:bg-gray-600 rounded-lg"
                            >
                                <span>{index + 1}. {user.name}</span>
                                <span className="text-green-400 font-bold">{user.rightAnswers}</span>
                                <span className="text-blue-400 font-bold">{user.points}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No data available for MCQs.</p>
                )}
            </div>
        </div>

        {/* Problem Leaderboard */}
        <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4 text-center">Problem Leaderboard</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                {userProblem.length > 0 ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4 font-semibold">
                            <span>Username</span>
                            <span>Problems Solved</span>
                            <span>Total Points</span>
                        </div>
                        {userProblem.map((user, index) => (
                            <div
                                key={user._id}
                                className="grid grid-cols-3 gap-4 py-2 hover:bg-gray-600 rounded-lg"
                            >
                                <span>{index + 1}. {user.name}</span>
                                <span className="text-green-400 font-bold">{user.solved}</span>
                                <span className="text-blue-400 font-bold">{user.points}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No data available for Problems.</p>
                )}
            </div>
        </div>
    </div>
</div>




                </div>
            </div>
        </div>
    );
};

export default Dashboard;






