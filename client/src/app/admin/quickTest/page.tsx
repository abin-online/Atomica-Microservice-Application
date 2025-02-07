"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from "next/navigation";
import { FaEdit, FaSyncAlt } from "react-icons/fa";
import { blockQuestion, getAllQuestions } from "@/api/quickTest";

interface Question {
  _id: string;
  question: string;
  blocked: boolean;
}

const QuickTest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5); 
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestions();
        console.log(response, "response ")
        setQuestions(response || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const toggleQuestionStatus = async (id: string, isBlocked: boolean) => {
    try {
      setUpdatingId(id);
      const newStatus = !isBlocked;
      const response = await blockQuestion(id, newStatus)
      if (response.status === 200) {
        toast.success("Question status updated successfully");
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q._id === id ? { ...q, blocked: newStatus } : q
          )
        );
      } else {
        toast.error("Failed to update question status");
      }
    } catch (error) {
      toast.error("Failed to update question status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateTest = () => {
    router.push("/admin/createQuickTest");
  };

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">Quick Test Questions</h1>
            <button
              onClick={handleCreateTest}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Create New
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <FaSyncAlt className="text-4xl animate-spin" />
            </div>
          ) : questions.length === 0 ? (
            <p className="text-center text-xl text-gray-400">No questions found.</p>
          ) : (
            <>
              <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-4 border-b border-gray-600">Question</th>
                    <th className="p-4 border-b border-gray-600">Status</th>
                    <th className="p-4 border-b border-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuestions.map((q) => (
                    <tr key={q._id} className="hover:bg-gray-700">
                      <td className="p-4 border-b border-gray-600">{q.question}</td>
                      <td className="p-4 border-b border-gray-600">
                        {q.blocked ? (
                          <span className="text-red-400 font-semibold">Blocked</span>
                        ) : (
                          <span className="text-green-400 font-semibold">Active</span>
                        )}
                      </td>
                      <td className="p-4 border-b border-gray-600">
                        <div className="flex items-center space-x-3 justify-center">
                          <button
                            onClick={() => router.push(`/admin/editQuickTest/${q._id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => toggleQuestionStatus(q._id, q.blocked)}
                            disabled={updatingId === q._id}
                            className={`w-32 py-2 px-4 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2 ${
                              q.blocked
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } ${updatingId === q._id ? "bg-gray-400 cursor-not-allowed" : ""}`}
                          >
                            {q.blocked ? "UNBLOCK" : "BLOCK"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {Array.from(
                    { length: Math.ceil(questions.length / questionsPerPage) },
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

export default QuickTest;
