'use client';
import { getSolutions, like, postComment } from '@/api/community';
import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid'; // Solid Heart Icon
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'; // Outline Heart Icon
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Arrow Icon

interface SolutionProps {
    problem: string;
}

interface ISolution {
    _id: string;
    author: string;
    email: string;
    problem: string;
    code: string;
    notes: string;
    language: string;
    upvotes: number;
    comments: Array<{
        author: string;
        text: string;
        createdAt: string;
        replies: Array<{ author: string; text: string; }>;
    }>;
    createdAt: string; 
}

const Solutions: React.FC<SolutionProps> = ({ problem }) => {

    const user: any = localStorage.getItem('user');
    const USER = JSON.parse(user);

    const [solutions, setSolutions] = useState<ISolution[]>([]);
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({}); // Tracks comment input per solution
    const [viewComments, setViewComments] = useState<{ [key: string]: boolean }>({}); // Tracks the state for viewing comments

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await getSolutions(problem); // Fetch solutions by problem
                if (response?.status === 201) {
                    setSolutions(response.data); // Set fetched solutions
                }
            } catch (error) {
                console.error('Error fetching solutions:', error);
            }
        };
        fetchSolutions();
    }, [problem]);

    const handleLike = async (id: string) => {
        try {
            const response = await like(id, USER?.email);
            if (response?.status === 201) {
                setSolutions((prevSolutions) =>
                    prevSolutions.map((solution) =>
                        solution._id === id
                            ? { ...solution, upvotes: response.data.upvotes }
                            : solution
                    )
                );
            }
        } catch (error) {
            console.error('Error liking solution:', error);
        }
    };

    const handleCommentChange = (id: string, value: string) => {
        setCommentText((prev) => ({ ...prev, [id]: value }));
    };


    

    const handleCommentSubmit = async (id: string) => {
        const comment = commentText[id];
        if (!comment) return;

        try {
            const response = await postComment(id, USER?.name, comment); // Send comment via API
            if (response?.status === 201) {
                setSolutions((prev) =>
                    prev.map((solution) => solution._id === id ? { ...solution,
           comments: [
                ...solution.comments,  {  author: USER?.name, text: comment, createdAt: new Date().toISOString(), replies: [],   }   ],
                              }: solution
                    )
                );
                setCommentText((prev) => ({ ...prev, [id]: '' })); // Clear input
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const toggleComments = (id: string) => {
        setViewComments((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Solutions for: {problem}</h2>
            {solutions.length > 0 ? (


                                     <div className="space-y-6 overflow-y-auto max-h-[70vh]">
                    {solutions.map((solution : any) => (
                        <div key={solution._id} className="mb-6 p-4 bg-gray-800 rounded-md shadow-md">
                            {/* Solution Header */}
                            <div className="mb-2">
                                <p className="font-medium text-lg">
                                    submitted by <span className="text-blue-500">{solution.author}</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Language: <span className="font-medium text-green-500">{solution.language}</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Submitted on:{' '}
                                    <span className="font-medium text-yellow-500">
                                        {new Date(solution.createdAt).toLocaleString()}
                                    </span>
                                </p>
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <p className="text-gray-300">{solution.notes}</p>
                            </div>

                            {/* Code */}
                            <div className="bg-gray-700 p-3 rounded-md overflow-x-auto">
                                <pre className="text-sm">{solution.code}</pre>
                            </div>

                            {/* Like Button */}
                            <div className="mt-4 flex items-center space-x-4">
                                {/* <button
                                    onClick={() => handleLike(solution._id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                                >
                                    <HeartOutline className="h-5 w-5 text-red-500" />
                                    <span>{solution.upvotes.length}</span>
                                </button> */}
                                <button
                                    onClick={() => handleLike(solution._id)}
                                    // className={`flex items-center space-x-2 px-4 py-2 rounded-md shadow-md transition ${
                                    //     solution.upvotes.includes(USER?.email)
                                    //         ? 'bg-red-600 hover:bg-red-700'
                                    //         : 'bg-blue-600 hover:bg-blue-700'
                                    // }`}
                                >
                                    {solution.upvotes.includes(USER?.email) ? (
                                        <HeartIcon className="h-5 w-5 text-red-500" />
                                    ) : (
                                        <HeartOutline className="h-5 w-5 text-red-500" />
                                    )}
                                 <span>{solution.upvotes.length}</span>
                                </button>
                            </div>

                            {/* View/Hide Comments Toggle */}
                            <button
                                onClick={() => toggleComments(solution._id)}
                                className="mt-4 text-blue-500 hover:underline text-sm"
                            >
                                {viewComments[solution._id] ? 'Hide Comments' : 'View Comments'}
                            </button>

                            {/* Comments Section */}
                            {viewComments[solution._id] && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-3 text-yellow-400">Comments</h3>
                                    
                                    
                                           {solution.comments.length > 0 ? (
                                        <div className="space-y-4">
                                            {solution.comments.map((comment : any, index : number) => (
                                                <div
                                                    key={index}
                                                    className="p-4 bg-gray-700 rounded-md shadow-sm hover:shadow-md transition"
                                                >
                                                    <div className="mb-2">
                                                        <p className="text-sm font-semibold text-blue-400">
                                                            {comment.author}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(comment.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-gray-200 text-sm">{comment.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                                    )}
                                </div>
                            )}

                            {/* Add Comment */}
<div className="mt-4 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={commentText[solution._id] || ''}
                                    onChange={(e) => handleCommentChange(solution._id, e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-md outline-none placeholder-gray-500"
                                />
                                <button
                                    onClick={() => handleCommentSubmit(solution._id)}
                                    className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                >
                                    <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No solutions found for this problem.</p>
            )}
        </div>
    );
};

export default Solutions

