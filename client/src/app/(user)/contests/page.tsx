'use client'

import React, { useEffect, useState } from 'react';
import { showContest } from '@/api/contest';
import { useRouter } from 'next/navigation';

export interface Contest {
  _id: string;
  contestName: string;
  selectedProblems: string[];
  selectedMCQs: string[];
  points: number;
  duration: number;
  expiryDate: string;
  candidate: any[];
  __v: number;
}

const Contest = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timers, setTimers] = useState<{ [key: string]: string }>({});
    const router = useRouter()
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response: any = await showContest();
        setContests(response?.data.contests || []);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    const updateTimers = () => {
      const now = new Date().getTime();

      const newTimers: { [key: string]: string } = {};
      contests.forEach((contest) => {
        const expiry = new Date(contest.expiryDate).getTime();
        const timeLeft = expiry - now;

        if (timeLeft <= 0) {
          newTimers[contest._id] = 'Expired';
        } else {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          newTimers[contest._id] = `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimers(newTimers);
    };

    const intervalId = setInterval(updateTimers, 1000);



    return () => clearInterval(intervalId);
  }, [contests]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white py-10">
      <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">Contests</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-10">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className="w-82 h-64 p-4 bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 text-center">
                {contest.contestName}
              </h2>
              <div className="flex flex-col items-center">
                <p className="mb-4 text-gray-300 text-lg">
                  <strong>Time Left: </strong>
                  <span className={`font-semibold text-${timers[contest._id] === 'Expired' ? 'red-500' : 'yellow-400'}`}>
                    {timers[contest._id] || 'Calculating...'}
                  </span>
                </p>
              </div>
              <button
                onClick={()=> router.push(`/contest/${contest._id}`)}
                className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 mt-4 shadow-md hover:shadow-lg"
              >
                Join Contest
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contest;
