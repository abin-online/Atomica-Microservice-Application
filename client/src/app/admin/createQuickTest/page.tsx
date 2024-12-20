'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CreateQuickTest = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        question: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
        },
        correctAnswer: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;

        if (id === 'question' || id === 'correctAnswer') {
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                options: {
                    ...prev.options,
                    [id]: value, // Update the correct option
                },
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("Form Data Submitted:", formData); // Log the form data
            const response = await axios.post('http://localhost:5001/mcq/addQuestion', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("responseeeeeeeeeeee",response)
            if (response.status === 201) {
                toast.success('Question created successfully')
                router.push('/admin/quickTest')
            } else {
                toast.error('Error in creating question')
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error('Fill all the fields')
        }
    };
    

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-800 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-700 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Create Question</h1>

                    {/* Question */}
                    <div className="mb-4">
                        <label htmlFor="question" className="block text-lg mb-2 font-medium">
                            Question:
                        </label>
                        <textarea
                            id="question"
                            rows={3}
                            value={formData.question}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your question here..."
                        ></textarea>
                    </div>

                    {/* Options */}
                    <div className="mb-6">
    <label className="block text-lg font-medium">Options:</label>
    <div className="grid grid-cols-2 gap-4">
        {Object.keys(formData.options).map((option, index) => (
            <input
                key={option} // Use the option name for the key
                id={option} // Use the option name for the id
                type="text"
                value={formData.options[option as keyof typeof formData.options]}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${index + 1}`}
            />
        ))}
    </div>
</div>


                    {/* Correct Answer */}
                    <div className="mb-4">
                        <label htmlFor="correctAnswer" className="block text-lg mb-2 font-medium">
                            Correct Answer:
                        </label>
                        <input
                            id="correctAnswer"
                            type="text"
                            value={formData.correctAnswer}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the correct answer"
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

export default CreateQuickTest;
