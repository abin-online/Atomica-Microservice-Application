'use client';
import React, { useEffect, useState } from 'react';
import { getSolutions, like, postComment, replyComment } from '@/api/community';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

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
    upvotes: number[];
    comments: Array<{
        _id: string;
        author: string;
        text: string;
        createdAt: string;
        replies: Array<{ _id: string; author: string; text: string; createdAt: string }>;
    }>;
    createdAt: string;
}

const Solutions: React.FC<SolutionProps> = ({ problem }) => {
    const user: any = localStorage.getItem('user');
    const USER = JSON.parse(user);

    const [solutions, setSolutions] = useState<ISolution[]>([]);
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
    const [viewComments, setViewComments] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await getSolutions(problem);
                if (response?.status === 201) {
                    setSolutions(response.data);
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

    const handleReplyChange = (commentId: string, value: string) => {
        setReplyText((prev) => ({ ...prev, [commentId]: value }));
    };

    const handleCommentSubmit = async (id: string) => {
        const comment = commentText[id];
        if (!comment) return;

        try {
            const response = await postComment(id, USER?.name, comment);
            if (response?.status === 201) {
                setSolutions((prev) =>
                    prev.map((solution) =>
                        solution._id === id
                            ? {
                                ...solution,
                                comments: [
                                    ...solution.comments,
                                    {
                                        _id: response.data._id, // Ensure the comment has a unique ID
                                        author: USER?.name,
                                        text: comment,
                                        createdAt: new Date().toISOString(),
                                        replies: [],
                                    },
                                ],
                            }
                            : solution
                    )
                );
                setCommentText((prev) => ({ ...prev, [id]: '' }));
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleReplySubmit = async (commentId: string) => {
        const reply = replyText[commentId];
        if (!reply) return;

        try {
            const response: any = await replyComment(commentId, USER?.name, reply);
            if (response?.status === 201) {
                // setSolutions((prev) =>
                //     prev.map((solution) => ({
                //         ...solution,
                //         comments: solution.comments.map((comment) =>
                //             comment._id === commentId
                //                 ? {
                //                     ...comment,
                //                     replies: [
                //                         ...comment.replies,
                //                         {
                //                             _id: response.data._id, // Ensure the reply has a unique ID
                //                             author: USER?.name,
                //                             text: reply,
                //                             createdAt: new Date().toISOString(),
                //                         },
                //                     ],
                //                 }
                //                 : comment
                //         ),
                //     }))
                // );
                setSolutions((prevSolutions) =>
                    prevSolutions.map((solution) => {
                        // Only update the solution that contains the comment
                        if (solution.comments.some((comment) => comment._id === commentId)) {
                            return {
                                ...solution,
                                     comments: solution.comments.map((comment) =>
                                    comment._id === commentId ? {
                                            ...comment, replies: [...comment.replies, response.data.replied], // Use backend response directly
                                            }: comment),};}
                                            return solution; }));
                
                setReplyText((prev) => ({ ...prev, [commentId]: '' }));
            }
        } catch (error) {
            console.error('Error posting reply:', error);
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
                    {solutions.map((solution) => (
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
                                <button onClick={() => handleLike(solution._id)}>
                                    {solution.upvotes.includes(USER?.email) ? (
                                        <HeartIcon className="h-5 w-5 text-red-500" />
                                    ) : (
                                        <HeartOutline className="h-5 w-5 text-red-500" />
                                    )}
                                    <span>{solution.upvotes.length}</span>
                                </button>
                            </div>

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
                                            {solution.comments.map((comment) => (
                                                <div key={comment._id} className="p-4 bg-gray-700 rounded-md shadow-sm hover:shadow-md transition">
                                                    <div className="mb-2">
                                                        <p className="text-sm font-semibold text-blue-400">
                                                            {comment.author}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(comment.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-gray-200 text-sm">{comment.text}</p>

                                                    {/* Reply Button */}
                                                    <div className="mt-4 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={replyText[comment._id] || ''}
                                                            onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="w-full p-2 bg-gray-600 text-white rounded-md"
                                                        />
                                                        <button
                                                            onClick={() => handleReplySubmit(comment._id)}
                                                            className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                                        >
                                                            <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45" />
                                                        </button>

                                                        {/* Display Replies */}
                                                        {comment.replies.length > 0 && (
                                                            <div className="mt-3 space-y-2 pl-4">
                                                                {comment.replies.map((reply) => (
                                                                    <div key={reply._id} className="text-gray-300 text-sm">
                                                                        <p>
                                                                            <span className="font-semibold">{reply.author}:</span> {reply.text}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                                    )}
                                </div>
                            )}

        
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No solutions found for this problem.</p>
            )}
        </div>
    );
};

export default Solutions;
