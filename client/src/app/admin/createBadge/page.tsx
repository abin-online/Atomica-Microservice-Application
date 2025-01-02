'use client';

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";

const CreateBadge = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        minQuestionsSolved: 0
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "minQuestionsSolved" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            if(formData.name.trim() == '') {
                toast.error('Fill out the tag name field')
                return
            }
            if(formData.description.trim() == ''){
                toast.error('Fill out the  description field')
                return
            }
            if(formData.minQuestionsSolved < 10){
                toast.error('Minimum question should greater than 10')
                return 
            }
            const response = await axios.post("http://localhost:5003/badge/badge", formData);
            if (response.status === 201) {
                toast.success("Badge created successfully!");
                setFormData({
                    name: "",
                    description: "",
                    minQuestionsSolved: 0,
                });
            }
        } catch (error) {
            console.error("Error creating badge:", error);
            toast.error("Failed to create badge");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-800 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-700 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Create Badge</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="minQuestionsSolved" className="block text-sm font-medium mb-1">
                                Minimum Questions Solved
                            </label>
                            <input
                                type="number"
                                id="minQuestionsSolved"
                                name="minQuestionsSolved"
                                value={formData.minQuestionsSolved}
                                onChange={handleChange}
                                
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            />
                        </div>
  
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="py-2 px-4 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                            >
                                {loading ? "Creating..." : "Create Badge"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBadge;
