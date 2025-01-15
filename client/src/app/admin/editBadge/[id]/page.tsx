'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { getBadge, updateBadge } from "@/api/badge";

const EditBadge = () => {
    const router = useRouter();
    const pathname = usePathname();

    const id = pathname.split('/').pop() || '';

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        minQuestionsSolved: 0,
        category: '',
        image: null as File | null, // Image file to be uploaded
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!id) return;
        
        const fetchBadgeData = async () => {
            try {
                
                const response : any = await getBadge(id)
                const badge = response.data;


                setFormData({
                    name: badge.name,
                    description: badge.description,
                    minQuestionsSolved: badge.minQuestionsSolved,
                    category: badge.category,
                    image: null, 
                });


                setImagePreview(badge.imageURL);
            } catch (error) {
                console.error("Error fetching badge data:", error);
                toast.error("Failed to fetch badge data.");
            }
        };

        fetchBadgeData();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = files ? files[0] : null;
            if (file) {

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));

                setImagePreview(URL.createObjectURL(file));
            }
        } else {

            setFormData((prevData) => ({
                ...prevData,
                [name]: name === "minQuestionsSolved" ? Number(value) : value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.name.trim() === '') {
            toast.error('Fill out the tag name field');
            return;
        }
        if (formData.description.trim() === '') {
            toast.error('Fill out the description field');
            return;
        }
        if (formData.minQuestionsSolved < 1) {
            toast.error('Minimum questions should be greater than 1');
            return;
        }

        try {
            setLoading(true);

            const uploadData = new FormData();
            uploadData.append('name', formData.name);
            uploadData.append('description', formData.description);
            uploadData.append('minQuestionsSolved', formData.minQuestionsSolved.toString());
            uploadData.append('category', formData.category);
            // Append the new image if it exists
            if (formData.image) {
                uploadData.append('image', formData.image);
            }

            const headers =  {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const response : any = await updateBadge(id, uploadData, headers)

            if (response?.status === 200) {
                toast.success("Badge updated successfully!");
                router.push("/admin/badges"); // Redirect after successful update
            }
        } catch (error) {
            console.error("Error updating badge:", error);
            toast.error("Failed to update badge.");
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
                    <h1 className="text-2xl font-bold mb-4">Edit Badge</h1>
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
                                {loading ? "Updating..." : "Update Badge"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBadge;
