'use client'

// ActionButtons.tsx
import React from 'react';

interface ActionButtonsProps {
  handleRun: () => void;
  handleSubmit: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleRun,
  handleSubmit,
  setModalOpen,
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* RUN Button */}
      <button
        onClick={handleRun}
        className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v18l15-9L5 3z"
          />
        </svg>
        RUN
      </button>

      {/* SUBMIT Button */}
      <button
        onClick={handleSubmit}
        className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        SUBMIT
      </button>

      {/* Create Session Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-sm"
      >
        Create Session
      </button>
    </div>
  );
};

export default ActionButtons;
