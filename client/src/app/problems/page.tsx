'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '@/components/user/Navbar';
import Link from 'next/link';

// Define the Problem type
interface Problem {
    _id: string;
    no: string;
    title: string;
    difficulty: string;
}

const Page = () => {
    const [problems, setProblems] = useState<Problem[]>([]); // State to store problems data
    const [loading, setLoading] = useState(true); // State for loading status

    // Fetch problems from the backend API
    useEffect(() => {
        axios.get('http://localhost:5002/problem/getAllProblems')
            .then(response => {
                setProblems(response.data); // Assuming response.data contains the list of problems
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching problems:', error);
                setLoading(false);
            });
    }, []);

    // Render loading state or the problems
    if (loading) {
        return <div>Loading problems...</div>;
    }

    return (
        <div className="quick-test-home bg-gray-100 text-gray-800 min-h-screen">
            {/* Navigation Bar */}
            <NavBar />

            {/* Problems List Section */}
            <section className="problems-list py-8 px-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">List of Problems</h2>

                {/* Table for Problems */}
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">No</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr key={problem._id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link href={`/problemView/${problem._id}`}>
                                        {index + 1}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link href={`/problemView/${problem._id}`}>
                                        {problem.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link href={`/problemView/${problem._id}`}>
                                        {problem.difficulty}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Footer */}
            <footer className="py-6 mt-8 bg-primary-500 text-white text-center">
                <p>&copy; 2024 Quick Test. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Page;
