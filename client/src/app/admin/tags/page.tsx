'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useConfirmationDialog } from '@/app/customHooks/useConfirmationDialog';
import toast from 'react-hot-toast';
import { FaEdit, FaSyncAlt } from 'react-icons/fa';

interface Tag {
    _id: string;
    name: string;
    blocked: boolean;
}

const Tags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const { dialog, openDialog } = useConfirmationDialog();

      const [currentPage, setCurrentPage] = useState(1);
      const [tagsPerPage] = useState(5);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get('http://localhost:5001/tag/getAllTags');
                setTags(response.data);
            } catch (err) {
                console.error('Error fetching tags:', err);
            } finally {
                setLoading(false); // Set loading to false after the fetch is complete
            }
        };
        fetchTags();
    }, []);

    const handleAddTag = async () => {
        if (newTag.trim()) {
            try {
                const response = await axios.post('http://localhost:5001/tag/addTag', {
                    tag: newTag.trim(),
                });
                setTags((prevTags) => [...prevTags, response.data]);
                setNewTag('');
                setShowPopup(false);
            } catch (err) {
                console.error('Error adding tag:', err);
            }
        }
    };

    const toggleBlockedStatus = async (_id: string, currentStatus: boolean) => {
        try {
            await axios.put('http://localhost:5001/tag/blockTag', {
                tag: _id,
                blocked: !currentStatus,
            });

            toast.success(`Successfully ${currentStatus ? 'unblocked' : 'blocked'}`);
            setTags((prevTags) =>
                prevTags.map((tag) =>
                    tag._id === _id ? { ...tag, blocked: !currentStatus } : tag
                )
            );
        } catch (err) {
            console.error('Error updating tag status:', err);
        }
    };

    const confirmBlock = (id: string, status: boolean) => {
        const toggle = status ? 'unblock' : 'block';
        openDialog({
            title: 'Status Confirmation',
            message: `Are you sure you want to ${toggle} this tag?`,
            onConfirm: () => toggleBlockedStatus(id, status),
        });
    };

    const indexOfLastTag = currentPage * tagsPerPage;
    const indexOfFirstTag = indexOfLastTag - tagsPerPage;
    const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Tag List</h1>
                        <button
                            onClick={() => setShowPopup(true)}
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Add Tag
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <FaSyncAlt className="text-4xl animate-spin" />
                        </div>
                    ) : tags.length === 0 ? (
                        <p className="text-center text-xl text-gray-400">No tags found.</p>
                    ) : (
                        <>
                            <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                                <thead>
                                    <tr className="bg-gray-700 text-gray-300">
                                        <th className="p-4 border-b border-gray-600">Tag</th>
                                        <th className="p-4 border-b border-gray-600">Status</th>
                                        <th className="p-4 border-b border-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.map((tag) => (
                                        <tr key={tag._id} className="hover:bg-gray-700">
                                            <td className="p-4 border-b border-gray-600">{tag.name}</td>
                                            <td className="p-4 border-b border-gray-600">
                                                {tag.blocked ? (
                                                    <span className="text-red-400 font-semibold">Blocked</span>
                                                ) : (
                                                    <span className="text-green-400 font-semibold">Active</span>
                                                )}
                                            </td>
                                            <td className="p-4 border-b border-gray-600">
                                                <div className="flex items-center space-x-3 justify-center">
                                                    <button
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                                                    >
                                                        <FaEdit />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => confirmBlock(tag._id, tag.blocked)}
                                                        className={`w-32 py-2 px-4 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2 ${tag.blocked
                                                                ? 'bg-red-500 hover:bg-red-600'
                                                                : 'bg-green-500 hover:bg-green-600'
                                                            }`}
                                                    >
                                                        {tag.blocked ? 'Unblock' : 'Block'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                                        {/* Pagination */}
              <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {Array.from(
                    { length: Math.ceil(tags.length / tagsPerPage) },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
                        </>
                    )}

                    {dialog}

                    {/* Popup for Adding a New Tag */}
                    {showPopup && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-lg font-bold mb-4 text-white">Add New Tag</h2>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Enter tag name"
                                    className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddTag}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tags;
