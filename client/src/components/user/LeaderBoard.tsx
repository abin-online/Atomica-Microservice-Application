"use client";

import { leaderBoardFromBadgeService } from "@/api/badge";
import { userList } from "@/api/contest";
import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  type User = {
    _id: number;
    name: string;
    points: number;
    avatar: string;
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

  type LeaderboardEntry = {
    userName: string;
    totalPoints: number;
    contestCount: number;
  };

  const [users, setUsers] = useState<User[]>([]);
  const [userMcq, setUserMcq] = useState<UserMcq[]>([]);
  const [userProblem, setUserProblem] = useState<UserProblem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const [contestUsers, responseForProblemAndMcq]: any = await Promise.all([
          userList(),
          leaderBoardFromBadgeService(),
        ]);

        setLeaderboard(contestUsers.data);
        setUserMcq(responseForProblemAndMcq.data.userMcq);
        setUserProblem(responseForProblemAndMcq.data.userProblem);
      } catch (error) {
        console.error("Error:::::::::", error);
      }
    };

    fetchLeaderBoard();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white py-10">
      <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-10">
        {/* Contest Leaderboard */}
        <div className="w-82 h-auto p-6 bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 text-center">Contest Leaderboard</h2>
          <div className="grid grid-cols-3 gap-4 text-gray-300 font-medium border-b pb-3">
            <span>User</span>
            <span>Points</span>
            <span>Contests</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-gray-300 border-b py-2">
              <span>{entry.userName}</span>
              <span>{entry.totalPoints} pts</span>
              <span>{entry.contestCount} contests</span>
            </div>
          ))}
        </div>

        {/* MCQ Leaderboard */}
        <div className="w-82 h-auto p-6 bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-6 text-center">MCQ Leaderboard</h2>
          <div className="grid grid-cols-3 gap-4 text-gray-300 font-medium border-b pb-3">
            <span>User</span>
            <span>Correct</span>
            <span>Points</span>
          </div>
          {userMcq.map((user) => (
            <div key={user._id} className="grid grid-cols-3 gap-4 text-gray-300 border-b py-2">
              <span>{user.name}</span>
              <span>{user.rightAnswers} correct</span>
              <span>{user.points} pts</span>
            </div>
          ))}
        </div>

        {/* Problem Leaderboard */}
        <div className="w-82 h-auto p-6 bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-6 text-center">Problem Leaderboard</h2>
          <div className="grid grid-cols-3 gap-4 text-gray-300 font-medium border-b pb-3">
            <span>User</span>
            <span>Solved</span>
            <span>Points</span>
          </div>
          {userProblem.map((user) => (
            <div key={user._id} className="grid grid-cols-3 gap-4 text-gray-300 border-b py-2">
              <span>{user.name}</span>
              <span>{user.solved} solved</span>
              <span>{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
