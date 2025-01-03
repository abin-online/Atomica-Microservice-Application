"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useAppDispatch } from "@/lib/hook";
import { setAdmin } from "@/lib/features/users/adminSlice";
import { useRouter } from "next/navigation";
import { FaEdit, FaSyncAlt } from "react-icons/fa";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(5);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      dispatch(setAdmin(JSON.parse(storedAdmin)));
    } else {
      router.push(`/admin`);
    }

    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:5002/problem/getAllProblems");
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [dispatch, router]);

  const handleBlock = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(
        `http://localhost:5002/problem/blockProblem`,
        { 
          problemId: id,
          blocked: updatedStatus,
        },
      );

      setProblems((prev) =>
        prev.map((p) => (p._id === id ? { ...p, blocked: updatedStatus } : p))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/editProblem/${id}`);
  };

  const handleCreateProblem = () => {
    router.push("/admin/createProblem");
  };

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">Manage Problems</h1>
            <button
              onClick={handleCreateProblem}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Create New Problem
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <FaSyncAlt className="text-4xl animate-spin" />
            </div>
          ) : problems.length === 0 ? (
            <p className="text-center text-xl text-gray-400">No problems found.</p>
          ) : (
            <>
              <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-4 border-b border-gray-600">Title</th>
                    <th className="p-4 border-b border-gray-600">Status</th>
                    <th className="p-4 border-b border-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProblems.map((problem) => (
                    <tr key={problem._id} className="hover:bg-gray-700">
                      <td className="p-4 border-b border-gray-600">{problem.title}</td>
                      <td className="p-4 border-b border-gray-600">
                        {problem.blocked ? (
                          <span className="text-red-400 font-semibold">Blocked</span>
                        ) : (
                          <span className="text-green-400 font-semibold">Active</span>
                        )}
                      </td>
                      <td className="p-4 border-b border-gray-600">
                        <div className="flex items-center space-x-3 justify-center">
                          <button
                            onClick={() => handleEdit(problem._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleBlock(problem._id, problem.blocked)}
                            className={`px-4 py-2 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2 ${
                              problem.blocked
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {problem.blocked ? "UNBLOCK" : "BLOCK"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {Array.from(
                    { length: Math.ceil(problems.length / problemsPerPage) },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
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
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
