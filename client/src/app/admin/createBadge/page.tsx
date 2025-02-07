'use client';

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { createBadge } from "@/api/badge";
import { useRouter } from "next/navigation";

const CreateBadge = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        minQuestionsSolved: 0,
        category: "problem", 
        image: null as File | null, // Specify the type for image
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, files } = e.target as  HTMLInputElement;

        // Handling file input separately
        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = files ? files[0] : null;

            if (file) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
                
                // Create an object URL for image preview
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            // Handle other inputs (text, number, etc.)
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === "minQuestionsSolved" ? Number(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("formData in handle submit ", formData)

        // Check if the form is filled correctly
        if (formData.name.trim() === '') {
            toast.error('Fill out the tag name field');
            return;
        }
        if (formData.description.trim() === '') {
            toast.error('Fill out the description field');
            return;
        }
        if (formData.minQuestionsSolved < 1) {
            toast.error('Minimum questions should be greater than 0');
            return;
        }
        if (!formData.image) {
            toast.error('Please select an image');
            return;
        }

        try {
            setLoading(true);

            // Create FormData to send the form data along with the file
            const uploadData = new FormData();
            uploadData.append('name', formData.name);
            uploadData.append('description', formData.description);
            uploadData.append('minQuestionsSolved', formData.minQuestionsSolved.toString());
            uploadData.append('category', formData.category)
            if (formData.image) {
                uploadData.append('image', formData.image); // Append the image file to FormData
            }
            uploadData.forEach((value, key) => {
                console.log(key, value);
            });
            

            const headers =  {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            console.log("upload dataa", uploadData)
            const response : any = await createBadge(uploadData, headers)

            if (response.status === 201) {
                toast.success("Badge created successfully!");
                router.push('/admin/badges')
                setFormData({
                    name: "",
                    description: "",
                    minQuestionsSolved: 0,
                    image: null, 
                    category: "problem",
                });
                setImagePreview(null); // Reset image preview
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
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-1">
                                Badge Type
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            >
                                <option value="problem">Problem</option>
                                <option value="test">Test</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium mb-1">
                                Badge Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Image Preview"
                                        className="max-w-xs h-auto rounded-md"
                                    />
                                </div>
                            )}
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
