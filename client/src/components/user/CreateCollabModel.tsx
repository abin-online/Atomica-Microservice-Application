'use client'

import { useState } from 'react';

export default function ModalDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        field1: '',
        field2: '',
    });

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form handling logic here
        toggleModal(); // Close the modal after submission
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Button to trigger the modal */}
            <button
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                onClick={toggleModal}
            >
                Open Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Enter Details</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="field1"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Field 1
                                </label>
                                <input
                                    type="text"
                                    id="field1"
                                    name="field1"
                                    value={formData.field1}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter first field"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="field2"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Field 2
                                </label>
                                <input
                                    type="text"
                                    id="field2"
                                    name="field2"
                                    value={formData.field2}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter second field"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
