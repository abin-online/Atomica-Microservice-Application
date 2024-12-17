'use client'

import React from 'react'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/SideBar'

const createQuickTest = () => {
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
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your question here..."
                        ></textarea>
                    </div>



                    {/* Options */}
                    <div className="mb-6">
                        <label className="block text-lg  font-medium">Options:</label>
                        {[...Array(4)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-1/4 p-3 mb-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                                placeholder={`Option ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Correct Answer */}
                    <div className="mb-4">
                        <label htmlFor="correctAnswer" className="block text-lg mb-2 font-medium">
                            Correct Answer:
                        </label>
                        <input
                            id="correctAnswer"
                            type="text"
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the correct answer"
                        />
                    </div>

                    {/* Difficulty Level and Tags */}
                    <div className="flex mb-4 space-x-4">
                        {/* Difficulty Level */}
                        <div className="w-1/2">
                            <label className="block text-lg mb-2 font-medium">Difficulty Level:</label>
                            <select
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="w-1/2">
                            <label htmlFor="tags" className="block text-lg mb-2 font-medium">Tags:</label>
                            <input
                                id="tags"
                                type="text"
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. Array, Algorithm"
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="button"
                            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white shadow-md transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default createQuickTest
