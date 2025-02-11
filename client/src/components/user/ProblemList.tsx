import { getUnblockedProblems } from '@/api/problem';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

interface Problem {
    _id: string;
    no: string;
    title: string;
    difficulty: string;
    tags: string[];
}

interface ProblemListProps {
    selectedTags: string[];
}

const ProblemList = ({ selectedTags }: ProblemListProps) => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [problemsPerPage] = useState(2);

    useEffect(() => {
        const fetchUnblockedProblems = async () => {
            try {
                const response: any = await getUnblockedProblems();
                setProblems(response.data);
                console.log("problems___________", response.data);
            } catch (error) {
                toast.error('Error fetching problems');
                console.error('Error fetching problems:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUnblockedProblems();
    }, []);

    const filteredProblems = problems.filter((problem) =>
        selectedTags.length === 0 || selectedTags.every((tag) => problem.tags.includes(tag))
    );


    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    ;


    if (loading) {
        return <LoadingSpinner message="Problems Are Loading" />;
    }

    return (
        <>
            {currentProblems.length ?
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
                            {Array.isArray(currentProblems) && currentProblems.map((problem, index) => (
                                <tr key={problem._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <a href={`/problemView/${problem._id}`}>{index + 1}</a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <a href={`/problemView/${problem._id}`}>{problem.title}</a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <a href={`/problemView/${problem._id}`}>{problem.difficulty}</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Component */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        problemsPerPage={problemsPerPage}
                    />
                </section> :

                <section className="problems-list py-12 px-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8 flex flex-col items-center justify-center space-y-6">
                    <div className="flex justify-center items-center bg-gray-100 rounded-full p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3h2M4 11h2M4 17h2M3 5h3M16 5h3M16 13h3M12 21h0a4 4 0 100-8h0a4 4 0 000 8zM12 13V7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">No Problems Found</h2>
                    <p className="text-gray-500">It looks like there are no problems available at the moment. Try searching again later or modify your filter settings.</p>
                    <button
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
                    >
                        Try Again
                    </button>
                </section>


            }
        </>
    );
};

export default ProblemList;
