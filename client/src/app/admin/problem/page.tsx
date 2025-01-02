'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import { useAppDispatch } from '@/lib/hook';
import { setAdmin } from '@/lib/features/users/adminSlice';
import { useRouter } from 'next/navigation';

interface IProblem {
  _id: string;
  title: string;
  blocked: boolean;
}

const Problem = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      dispatch(setAdmin(JSON.parse(storedAdmin)));
    } else {
      router.push(`/admin`);
    }

    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:5002/problem/getAllProblems');
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [dispatch, router]);

  const handleBlock = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`http://localhost:5002/problem/updateStatus/${id}`, {
        blocked: updatedStatus,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setProblems((prev) =>
        prev.map((p) => (p._id === id ? { ...p, blocked: updatedStatus } : p))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/editProblem/${id}`);
  };

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="flex-1 my-24 bg-gray-100 p-6">
        <div className="flex items-center justify-between my-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Problems</h1>
        </div>
        <div className="bg-gray-700 rounded-md shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-medium">Title</th>
                <th className="p-4 text-left text-sm font-medium">Status</th>
                <th className="p-4 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-300">
                    Loading...
                  </td>
                </tr>
              ) : problems.length > 0 ? (
                problems.map((problem) => (
                  <tr
                    key={problem._id}
                    className="border-b border-gray-600 hover:bg-gray-600 transition"
                  >
                    <td className="p-4">{problem.title}</td>
                    <td className="p-4">{problem.blocked ? 'Blocked' : 'Active'}</td>
                    <td className="p-4 flex items-center gap-4">
                      <button
                        onClick={() => handleEdit(problem._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleBlock(problem._id, problem.blocked)}
                        className={`px-4 py-2 text-white rounded-md shadow-md transition-all ${
                          problem.blocked
                            ? 'bg-red-500 hover:bg-red-400'
                            : 'bg-green-500 hover:bg-green-400'
                        }`}
                      >
                        {problem.blocked ? 'UNBLOCK' : 'BLOCK'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-300">
                    No problems available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem;
