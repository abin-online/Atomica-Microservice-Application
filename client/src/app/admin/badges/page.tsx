"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from "next/navigation";
import { FaEdit, FaSyncAlt } from "react-icons/fa";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

interface Badge {
  _id: string;
  name: string;
  description: string;
  minQuestionsSolved: number;
  isActive: boolean;
}

const BadgeList = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [badgesPerPage] = useState(5); // Number of badges per page
  const router = useRouter();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5003/badge/badge");
        setBadges(response.data);
      } catch (error) {
        console.error("Error fetching badges:", error);
        toast.error("Failed to load badges");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const toggleBadgeStatus = async (id: string, currentStatus: boolean) => {
    try {
      setUpdatingId(id);
      const newStatus = !currentStatus;
      await axios.put(
        "http://localhost:5003/badge/blockBadge",
        { id, isActive: newStatus }
      );

      
        toast.success("Badge status updated successfully");
        setBadges((prevBadges) =>
          prevBadges.map((badge) =>
            badge._id === id ? { ...badge, isActive: newStatus } : badge
          )
        )
  
    } catch (error) {
      toast.error("Failed to update badge status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateBadge = () => {
    router.push("/admin/createBadge");
  };

  // Pagination logic
  const indexOfLastBadge = currentPage * badgesPerPage;
  const indexOfFirstBadge = indexOfLastBadge - badgesPerPage;
  const currentBadges = badges.slice(indexOfFirstBadge, indexOfLastBadge);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">Badge List</h1>
            <button
              onClick={handleCreateBadge}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Create Badge
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <FaSyncAlt className="text-4xl animate-spin" />
            </div>
          ) : badges.length === 0 ? (
            <p className="text-center text-xl text-gray-400">No badges found.</p>
          ) : (
            <>
              <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-4 border-b border-gray-600">Name</th>
                    <th className="p-4 border-b border-gray-600">Description</th>
                    <th className="p-4 border-b border-gray-600">Status</th>
                    <th className="p-4 border-b border-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBadges.map((badge) => (
                    <tr key={badge._id} className="hover:bg-gray-700">
                      <td className="p-4 border-b border-gray-600">{badge.name}</td>
                      <td className="p-4 border-b border-gray-600">{badge.description}</td>
                      <td className="p-4 border-b border-gray-600">
                        {badge.isActive ? (
                          <span className="text-green-400 font-semibold">Active</span>
                        ) : (
                          <span className="text-red-400 font-semibold">Inactive</span>
                        )}
                      </td>
                      <td className="p-4 border-b border-gray-600">
                        <div className="flex items-center space-x-3 justify-center">
                          <button
                            onClick={() => router.push(`/admin/editBadge/${badge._id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => toggleBadgeStatus(badge._id, badge.isActive)}
                            disabled={updatingId === badge._id}
                            className={`w-32 py-2 px-4 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2 ${
                              badge.isActive
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } ${updatingId === badge._id ? "bg-gray-400 cursor-not-allowed" : ""}`}
                          >
                            {badge.isActive ? (
                              <>
                                <AiFillCloseCircle />
                                <span>Block</span>
                              </>
                            ) : (
                              <>
                                <AiFillCheckCircle />
                                <span>Unblock</span>
                              </>
                            )}
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
                    { length: Math.ceil(badges.length / badgesPerPage) },
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

export default BadgeList;
