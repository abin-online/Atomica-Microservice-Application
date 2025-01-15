'use client'
import React, { useEffect, useState } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  totalTests: number;
  passedTests: number;
  currentTime : string 

}

const CongratulatoryModal: React.FC<ModalProps> = ({ isVisible, onClose, totalTests, passedTests, currentTime }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowModal(true), 50); 
    } else {
      setShowModal(false);
    }
  }, [isVisible]);

  const userName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).name
    : "User";


  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-semibold focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-500 mb-2">Accepted</h2>
          <p className="text-lg text-gray-800 mb-4">
            {passedTests} / {totalTests} test cases passed
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Submitted by: <span className="font-medium">{userName}</span>
          </p>
          <p className="text-sm text-gray-600">
            Submitted at: <span className="font-medium">{currentTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CongratulatoryModal;
