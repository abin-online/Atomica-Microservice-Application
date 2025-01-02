"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import toast from "react-hot-toast";

interface FormData {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  inputFormat: { name: string; type: string; description: string }[];
  outputFormat: { type: string; description: string };
  constraints: string[];
  hints: string[];
}

const CreateProblem = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    difficulty: "Beginner",
    tags: [],
    inputFormat: [{ name: "", type: "", description: "" }],
    outputFormat: { type: "", description: "" },
    constraints: [""],
    hints: [""],
  });

  const [tags, setTags] = useState<{ _id: string; name: string; blocked: boolean }[]>([]);

  // Fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5002/problem/getTags");
        console.log("Tags fetched:", response.data);
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleArrayChange = (
    field: "constraints" | "hints",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addArrayField = (field: "constraints" | "hints") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleInputFormatChange = (index: number, key: string, value: string) => {
    setFormData((prev) => {
      const updatedInputFormat = [...prev.inputFormat];
      updatedInputFormat[index] = { ...updatedInputFormat[index], [key]: value };
      return { ...prev, inputFormat: updatedInputFormat };
    });
  };

  const addInputFormatField = () => {
    setFormData((prev) => ({
      ...prev,
      inputFormat: [...prev.inputFormat, { name: "", type: "", description: "" }],
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form data to be submitted:", formData);

  //   try {
  //     const response = await axios.post('http://localhost:5002/problem/addProblem', formData, {
  //       withCredentials: true,  // Include credentials (cookies, etc.)
  //       headers: {
  //           'Content-Type': 'application/json',  // Ensure the correct Content-Type header is set
  //       },
  //   });
    
  //     console.log("Problem added successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error adding problem:", error);
  //     if (axios.isAxiosError(error)) {
  //       console.error("Axios error:", error.response ? error.response.data : error.message);
  //     }
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data to be submitted:", formData);  // Ensure it's in the correct format
    try {
      const response = await axios.post('http://localhost:5002/problem/addProblem', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

      toast.success("Problem added successfully:", response.data);
    } catch (error) {
      console.error("Error adding problem:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response ? error.response.data : error.message);
      }
    }
  };
  
  const handleTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, tags: selectedOptions }));
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Header />
      <Sidebar />
      <div className="my-20 flex w-full px-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">Create Problem</h1>

          {/* Problem Title */}
          <div className="mb-5">
            <label htmlFor="title" className="block text-lg mb-2 font-semibold">
              Problem Title:
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
              placeholder="Enter problem title..."
            />
          </div>

          {/* Problem Description */}
          <div className="mb-5">
            <label htmlFor="description" className="block text-lg mb-2 font-semibold">
              Problem Description:
            </label>
            <textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
              placeholder="Enter problem description..."
            ></textarea>
          </div>

          {/* Difficulty */}
          <div className="mb-5">
            <label htmlFor="difficulty" className="block text-lg mb-2 font-semibold">
              Difficulty:
            </label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-5">
            <label htmlFor="tags" className="block text-lg mb-2 font-semibold">
              Tags:
            </label>
            <select
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleTagSelection}
              multiple
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
            >
              {tags.map(
                (tag) =>
                  !tag.blocked && (
                    <option key={tag._id} value={tag.name}>
                      {tag.name}
                    </option>
                  )
              )}
            </select>
            <p className="text-sm text-gray-400 mt-2">
              Hold <span className="font-semibold text-blue-400">Ctrl</span> (Windows) or <span className="font-semibold text-blue-400">Cmd</span> (Mac) to select multiple tags.
            </p>
          </div>

          {/* Input Format */}
          <div className="mb-5">
            <label className="block text-lg mb-2 font-semibold">Input Format:</label>
            {formData.inputFormat.map((field, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) =>
                    handleInputFormatChange(index, "name", e.target.value)
                  }
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={field.type}
                  onChange={(e) =>
                    handleInputFormatChange(index, "type", e.target.value)
                  }
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={field.description}
                  onChange={(e) =>
                    handleInputFormatChange(index, "description", e.target.value)
                  }
                  className="flex-2 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addInputFormatField}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Input Field
            </button>
          </div>

          {/* Output Format */}
          <div className="mb-5">
            <label htmlFor="outputFormat" className="block text-lg mb-2 font-semibold">
              Output Format:
            </label>
            <input
              id="outputFormat.type"
              type="text"
              placeholder="Output Type"
              value={formData.outputFormat.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  outputFormat: { ...prev.outputFormat, type: e.target.value },
                }))
              }
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
            />
            <textarea
              id="outputFormat.description"
              rows={3}
              placeholder="Output Description"
              value={formData.outputFormat.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  outputFormat: { ...prev.outputFormat, description: e.target.value },
                }))
              }
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
            ></textarea>
          </div>

          {/* Constraints */}
          <div className="mb-5">
            <label className="block text-lg mb-2 font-semibold">Constraints:</label>
            {formData.constraints.map((constraint, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Enter constraint"
                  value={constraint}
                  onChange={(e) => handleArrayChange("constraints", index, e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("constraints")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Constraint
            </button>
          </div>

          {/* Hints */}
          <div className="mb-5">
            <label className="block text-lg mb-2 font-semibold">Hints:</label>
            {formData.hints.map((hint, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Enter hint"
                  value={hint}
                  onChange={(e) => handleArrayChange("hints", index, e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("hints")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Hint
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
