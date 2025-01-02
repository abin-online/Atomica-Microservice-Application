'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from "next/navigation";

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
  const [updatingId, setUpdatingId] = useState<string | null>(null); // track the updating badge
  const router = useRouter()
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
      setLoading(true);
      setUpdatingId(id);
      const newStatus = !currentStatus;
      const data = { id, isActive: newStatus };

      console.log("Toggling badge status:", data); // Debug log

      const response = await axios.patch("http://localhost:5003/badge/badge", data, {
        headers: {
            'Content-Type': 'application/json',
        },
      });       


      if (response.status === 200) {
        console.log('Badge status updated successfully:', response.data); // Debug log
        toast.success("Badge status updated successfully");

        // Update the badges list locally without refetching
        setBadges((prevBadges) =>
          prevBadges.map((badge) =>
            badge._id === id ? { ...badge, isActive: newStatus } : badge
          )
        );
      } else {
        console.error("Failed to update badge status:", response);
        toast.error("Failed to update badge status");
      }
    } catch (error) {
      console.error("Error updating badge status:", error);
      toast.error("Failed to update badge status");
    } finally {
      setLoading(false);
      setUpdatingId(null); // Reset updating ID
    }
  };

  // Handle Create Badge button click
  const handleCreateBadge = () => {
    // Redirect to the page to create a new badge
   
    router.push('/admin/createBadge')
    // You can navigate to the "Create Badge" form or open a modal here
  };

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-800 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-700 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Badge List</h1>
            <button
              onClick={handleCreateBadge}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
            >
              Create Badge
            </button>
          </div>

          {badges.length === 0 ? (
            <p>No badges found.</p>
          ) : (
            <table className="w-full bg-gray-800 text-left border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="p-3 border border-gray-600">Name</th>
                  <th className="p-3 border border-gray-600">Description</th>
                  <th className="p-3 border border-gray-600">Status</th>
                  <th className="p-3 border border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <tr key={badge._id}>
                    <td className="p-3 border border-gray-600">{badge.name}</td>
                    <td className="p-3 border border-gray-600">{badge.description}</td>
                    <td className="p-3 border border-gray-600">
                      {badge.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="p-3 border border-gray-600">
                      <button
                        onClick={() => toggleBadgeStatus(badge._id, badge.isActive)}
                        disabled={loading || updatingId === badge._id}
                        className={`py-2 px-4 rounded-md font-semibold text-white ${
                          badge.isActive
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        } ${loading || updatingId === badge._id ? "bg-gray-400 cursor-not-allowed" : ""}`}
                      >
                        {loading || updatingId === badge._id ? "Updating..." : badge.isActive ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeList;
