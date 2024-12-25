'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useConfirmationDialog } from '@/app/customHooks/useConfirmationDialog';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

interface Tag {
    _id: string;
    name: string;
    blocked: boolean;
}

const Tags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newTag, setNewTag] = useState('');
    const { dialog, openDialog } = useConfirmationDialog();

    // Fetch tags from the backend
    //localhost:5001/mcq/blockQuestion
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:5001/tag/getAllTags');
                console.log("response data==>",response.data)
                setTags(response.data);
            } catch (err) {
                console.error('Error fetching tags:', err);
            }
        };
        fetchTags();
    }, [tags]);

    // Add a new tag
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

    // Toggle the blocked status of a tag
    const toggleBlockedStatus = async (_id: string, currentStatus: boolean) => {
        try {
            const response = await axios.put('http://localhost:5001/tag/blockTag', {
                tag: _id,
                blocked: !currentStatus,
            });

            toast.success(`Successfully ${currentStatus ? 'unblocked' : 'blocked'}`);
        } catch (err) {
            console.error('Error updating tag status:', err);
        }
    };

    const confirmBlock = (id: string, status: boolean) => {
        let toggle = ""
        if(status) {
            toggle = "unblock" 
        }else{
            toggle = "block"
        }
        openDialog({
          title: "Status Confirmation",
          message: `Are you sure you want to ${toggle}?`,
          onConfirm: ()=> toggleBlockedStatus(id , status),
        });
      };

    return (
        <div className="bg-gray-800 min-h-screen w-full flex">
            <Header />
            <Sidebar />
            <div className="flex-1 my-24 text-white p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">Tags</h1>
                    <button
                        onClick={() => setShowPopup(true)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
                    >
                        Add Tag
                    </button>
                </div>
                <table className="w-full bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-3 text-left text-white">Tag</th>
                            <th className="p-3 text-left text-white">Status</th>
                            <th className="p-3 text-left text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((x, index)=> {
                            return  <tr
                            key={x._id}
                            className={`${
                                index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'
                            } hover:bg-gray-500 transition`}
                        >
                            <td className="p-3">{x.name}</td>
                            <td className="p-3">{x.blocked ? 'Blocked' : 'Active'}</td>
                            <td className="p-3">
                                <button

                                    // onClick={() => toggleBlockedStatus(x._id, x.blocked)}
                                    onClick={() => confirmBlock(x._id, x.blocked)}
                                    className={`w-20 h-8 rounded-lg text-white ${
                                        x.blocked
                                            ? 'bg-red-500 hover:bg-red-400'
                                            : 'bg-green-500 hover:bg-green-400'
                                    } transition`}
                                >
                                    {x.blocked ? 'Unblock' : 'Block'}
                                </button>
                            </td>
                        </tr>
                        })}
                        
                    </tbody>
                </table>

                {/* Popup for Adding a New Tag */}
{dialog}
                
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
    );
};

export default Tags;
