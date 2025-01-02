'use client'

import React, { useEffect, useState } from 'react';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';

import Link from 'next/link';
import { useAppDispatch } from '@/lib/hook';
import { setAdmin } from '@/lib/features/users/adminSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const Problem = () => {
  type Question = { 
    _id: string;
    question: string;
    blocked: boolean;
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  const handleBlock = async (questionId: string, isBlocked: boolean) => {
    try {
      const response = await axios.put(`http://localhost:5001/mcq/blockQuestion`, {
        questionId,
        blocked: !isBlocked, // Toggle block status
      });

      if (response.status === 200) {
        // Update the state locally after success
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q._id === questionId ? { ...q, blocked: !isBlocked } : q
          )
        );
        toast.success(isBlocked ? 'Question Unblocked' : 'Question Blocked');
      }
    } catch (error) {
      toast.error('Error while updating block status');
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/mcq/getAllQuestions');
      setQuestions(response.data || []);
    } catch (error) {
      toast.error('Error in fetching questions');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []); // Dependency array is empty to avoid infinite loop

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      dispatch(setAdmin(JSON.parse(storedAdmin)));
    } else {
      router.push('/admin');
    }
  }, [dispatch, router]); // Added `router` to dependencies
  
  const handleCreateTest = ()=> {
    router.push('/admin/createQuickTest')
  }
  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="flex-1 my-24 bg-gray-100 p-6">
        <div className="flex items-center justify-between my-8">
          <h1 className="text-2xl font-bold text-gray-800">Quick Test</h1>
          <button onClick={handleCreateTest} className="px-5 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 shadow-lg transition-all">
            Create New
          </button>
        </div>
        <div className="bg-gray-700 rounded-md shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-medium">Question</th>
                <th className="p-4 text-left text-sm font-medium">Active Status</th>
                <th className="p-4 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {questions.length > 0 ? (
                questions.map((q) => (
                  <tr key={q._id} className="border-b border-gray-600 hover:bg-gray-600 transition">
                    <td className="p-4">{q.question}</td>
                    <td className="p-4">{q.blocked ? 'Blocked' : 'Active'}</td>
                    <td className="p-4 flex items-center gap-4">
                      <Link href={`/admin/editQuickTest/${q._id}`}>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition-all">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleBlock(q._id, q.blocked)}
                        className={`px-4 py-2 text-white rounded-md shadow-md transition-all ${
                          q.blocked
                            ? 'bg-red-500 hover:bg-red-400'
                            : 'bg-green-500 hover:bg-green-400'
                        }`}
                      >
                        {q.blocked ? 'UNBLOCK' : 'BLOCK'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-300">
                    No questions available
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
