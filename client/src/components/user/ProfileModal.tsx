// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, badges }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Badges</h2>
                <div className="grid grid-cols-2 gap-4">
                    {badges.map((badge) => (
                        <div key={badge._id} className="flex flex-col items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://via.placeholder.com/80"
                                alt={badge.name}
                                className="w-16 h-16 rounded-full border"
                            />
                            <p className="text-sm font-semibold mt-2">{badge.name}</p>
                            <p className="text-xs text-gray-600 text-center">{badge.description}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
