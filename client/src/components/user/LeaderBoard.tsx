'use client'

import React from "react";

const LeaderBoard = () => {
  const users = [
    { id: 1, name: "John Doe", score: 1500, avatar: "https://i.pravatar.cc/50?img=1" },
    { id: 2, name: "Jane Smith", score: 1450, avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Alice Johnson", score: 1400, avatar: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Bob Brown", score: 1350, avatar: "https://i.pravatar.cc/50?img=4" },
    { id: 5, name: "Charlie Davis", score: 1300, avatar: "https://i.pravatar.cc/50?img=5" },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-white text-center mb-8">
        🏆 Leaderboard
      </h2>
      <div className="space-y-6">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center justify-between px-6 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 ${
              index === 0
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg"
                : index === 1
                ? "bg-gradient-to-r from-gray-400 to-gray-500"
                : index === 2
                ? "bg-gradient-to-r from-yellow-200 to-yellow-300"
                : "bg-gray-700"
            }`}
          >
            {/* Rank */}
            <div className="flex items-center">
              <div
                className={`text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full ${
                  index === 0
                    ? "bg-yellow-500 text-gray-900"
                    : index === 1
                    ? "bg-gray-500 text-gray-200"
                    : index === 2
                    ? "bg-yellow-300 text-gray-800"
                    : "bg-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full ml-4 border-2 border-gray-300"
              />
              {/* Name */}
              <span className="ml-4 text-white font-medium text-xl">{user.name}</span>
            </div>
            {/* Score */}
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-xl">{user.score} pts</span>
              {/* Badge for top 3 */}
              {index < 3 && (
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    index === 0
                      ? "bg-yellow-400 text-gray-900"
                      : index === 1
                      ? "bg-gray-400 text-gray-900"
                      : "bg-yellow-200 text-gray-900"
                  }`}
                >
                  {index === 0 ? "Champion" : index === 1 ? "Runner-Up" : "Bronze"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

