'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { getQuickTest, updateQuestion } from '@/api/quickTest';
import { getAllTags } from '@/api/tag';

const EditQuickTest = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [formData, setFormData] = useState({
        question: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
        },
        correctAnswer: '',
        difficulty: '',
        tags: '',
    });

    interface Tag {
        _id: string;
        name: string;
        blocked: boolean;
        __v: number;
    }

    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        // Fetch tags
        const fetchTags = async () => {
            const response : any = await getAllTags()
            setTags(response?.data);
        };

        const questionId = pathname.split('/').pop() || '';
        if (questionId) {
            const getQuestion = async () => {
                try {
                    const data = await getQuickTest(questionId)
                                        
                    setFormData({
                        question: data.question,
                        options: {
                            option1: data.options.option1,
                            option2: data.options.option2,
                            option3: data.options.option3,
                            option4: data.options.option4,
                        },
                        correctAnswer: data.correctAnswer,
                        difficulty: data.difficulty,
                        tags: data.tags,
                    });

                } catch (error) {
                    console.error('Error fetching question:', error);
                    toast.error('Error fetching question');
                    router.push('/admin/quickTest');
                }
            };
            getQuestion();
        }

        fetchTags();
    }, [pathname]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;

        if (['question', 'difficulty', 'tags'].includes(id)) {
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        } else if (id === 'correctAnswer') {
            setFormData((prev) => ({
                ...prev,
                correctAnswer: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                options: {
                    ...prev.options,
                    [id]: value,
                },
            }));
        }
    };

    const handleSubmit = async () => {
        const questionId = pathname.split('/').pop() || '';
        if (!questionId) {
            toast.error('Invalid question ID');
            return;
        }

        if (!formData.question || !formData.correctAnswer || !Object.values(formData.options).every(opt => opt)) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const response: any = await updateQuestion(questionId, formData)

            if (response?.status === 200) {
                toast.success('Question updated successfully');
                router.push('/admin/quickTest');
            } else {
                toast.error('Error in updating question');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error('Failed to update question');
        }
    };

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-800 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-700 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Edit Question</h1>

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
                                    key={option}
                                    id={option}
                                    type="text"
                                    value={formData.options[option as keyof typeof formData.options]}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Option ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Correct Answer Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="correctAnswer" className="block text-lg mb-2 font-medium">
                            Correct Answer:
                        </label>
                        <select
                            id="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Correct Answer</option>
                            {Object.entries(formData.options).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value || `Option ${key.replace('option', '')}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Level */}
                    <div className="mb-4">
                        <label htmlFor="difficulty" className="block text-lg mb-2 font-medium">
                            Difficulty Level:
                        </label>
                        <select
                            id="difficulty"
                            value={formData.difficulty}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Difficulty</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-lg mb-2 font-medium">
                            Tags:
                        </label>
                        <select
                            id="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Tag</option>
                            {tags.map((tag) => (
                                !tag.blocked && (
                                    <option key={tag._id} value={tag._id}>
                                        {tag.name}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white shadow-md transition-all"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuickTest;
