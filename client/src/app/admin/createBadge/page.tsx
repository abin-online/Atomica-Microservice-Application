'use client'

import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import toast from "react-hot-toast";

interface BadgeFormData {
  name: string;
  description: string;
  minQuestionsSolved: number; // Change to number
}

const AddBadge = () => {
  const [formData, setFormData] = useState<BadgeFormData>({
    name: "",
    description: "",
    minQuestionsSolved: 0, // Initialize as a number
  });

  // Handle input change and ensure minQuestionsSolved is treated as a number
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: id === "minQuestionsSolved" ? Number(value) : value, // Ensure the correct type for minQuestionsSolved
    });
  };

  const handleSubmit = async () => {
    // Simple validation for empty fields
    if (!formData.name || !formData.description || formData.minQuestionsSolved <= 0) {
      toast.error("All fields are required and minQuestionsSolved should be a positive number!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5003/badge/addBadge', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure credentials are sent if required
      });

      toast.success("Badge added successfully!");
      setFormData({
        name: "",
        description: "",
        minQuestionsSolved: 0, // Reset to default number after successful submission
      });

      console.log(response.data); // Logs the response data from the backend

    } catch (error) {
      console.error("Error adding badge:", error);
      toast.error("Error adding badge. Please try again.");
    }
  };

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-800 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-700 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Add Badge</h1>

          {/* Badge Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2 font-medium">
              Badge Name:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter badge name"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg mb-2 font-medium">
              Description:
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter badge description"
            ></textarea>
          </div>

          {/* Minimum Questions Solved */}
          <div className="mb-4">
            <label htmlFor="minQuestionsSolved" className="block text-lg mb-2 font-medium">
              Minimum Questions Solved:
            </label>
            <input
              id="minQuestionsSolved"
              type="number"
              value={formData.minQuestionsSolved}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter minimum questions required"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBadge;
