"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaSyncAlt } from 'react-icons/fa';

const Testcases = () => {
    type TestCase = {
        _id: string; // Assuming each test case has a unique ID
        problem: string;
        input: string;
        expectedOutput: string;
    };

    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [filteredTestCases, setFilteredTestCases] = useState<TestCase[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const router = useRouter();

    const handleCreateTestCase = () => {
        router.replace("/admin/createTestCase");
    };

    const handleEditTestCase = (id: string) => {
        console.log("id___________", id)
        router.push(`/admin/editTestCase/${id}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = testCases.filter((testCase) =>
            testCase.problem.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTestCases(filtered);
    };

    useEffect(() => {
        const fetchTestCase = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4001/problem/testCase/testCases"
                );
                setTestCases(response?.data);
                console.log(response?.data)
                setFilteredTestCases(response?.data);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching test cases");
                setLoading(false);
            }
        };
        fetchTestCase();
    }, []);

    const currentTestCases = filteredTestCases.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTestCases.length / itemsPerPage);

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Test Cases</h1>
                        <button
                            onClick={handleCreateTestCase}
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Create New Testcase
                        </button>
                    </div>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by question"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Loading Spinner */}
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <FaSyncAlt className="text-4xl animate-spin" />
                        </div>
                    ) : filteredTestCases.length === 0 ? (
                        <p className="text-center text-xl text-gray-400">No test cases found.</p>
                    ) : (
                        <>
                            <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                                <thead>
                                    <tr className="bg-gray-700 text-gray-300">
                                        <th className="p-4 border-b border-gray-600">Question</th>
                                        <th className="p-4 border-b border-gray-600">Input</th>
                                        <th className="p-4 border-b border-gray-600">Expected Output</th>
                                        <th className="p-4 border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTestCases.map((testCase, index) => (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="p-4 border-b border-gray-600">{testCase.problem}</td>
                                            <td className="p-4 border-b border-gray-600">{testCase.input}</td>
                                            <td className="p-4 border-b border-gray-600">{testCase.expectedOutput}</td>
                                            <td className="p-4 border-b border-gray-600">
                                                <button onClick={()=>handleEditTestCase(testCase._id)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                                                >
                                                    <FaEdit />
                                                    <span>Edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex justify-center mt-4">
                                <ul className="flex space-x-2">
                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                        (pageNumber) => (
                                            <li key={pageNumber}>
                                                <button
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                    className={`px-4 py-2 rounded-lg ${currentPage === pageNumber
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                                                        }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Testcases;
