'use client';

import { listContest } from '@/api/contest';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

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

const ContestList = () => {
  const [contest, setContest] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contestsPerPage = 5; // Number of contests to display per page

  const router = useRouter();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response: any = await listContest();
        setContest(response?.data.contests || []);
        console.log("response    ", response.data);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, []);

  const handleEdit = (contestId: string) => {
    router.push(`/admin/editContest/${contestId}`);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentContests = contest.slice(
    (currentPage - 1) * contestsPerPage,
    currentPage * contestsPerPage
  );

  const handleCreateContest = ()=> {
    router.push(`/admin/createContest`)
  }

  const totalPages = Math.ceil(contest.length / contestsPerPage);

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Contests</h1>
                        <button
                            onClick={handleCreateContest}
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Create New Contest
                        </button>
                    </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <span className="text-2xl animate-spin">⏳</span>
            </div>
          ) : contest.length === 0 ? (
            <p className="text-center text-xl text-gray-400">No contests found.</p>
          ) : (
            <>
              <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-4 border-b border-gray-600">Contest Name</th>
                    <th className="p-4 border-b border-gray-600">Points</th>
                    <th className="p-4 border-b border-gray-600">Duration (mins)</th>
                    <th className="p-4 border-b border-gray-600">Expiry Date</th>
                    <th className="p-4 border-b border-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContests.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-700">
                      <td className="p-4 border-b border-gray-600">{item.contestName}</td>
                      <td className="p-4 border-b border-gray-600">{item.points}</td>
                      <td className="p-4 border-b border-gray-600">{item.duration} minutes</td>
                      <td className="p-4 border-b border-gray-600">{new Date(item.expiryDate).toLocaleDateString()}</td>
                      <td className="p-4 border-b border-gray-600 text-center">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                      <li key={pageNumber}>
                        <button
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestList;
