'use client'

// SessionModal.tsx
import React from "react";

interface SessionModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string | null;
  setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  joinSessionId: string;
  setJoinSessionId: React.Dispatch<React.SetStateAction<string>>;
  handleCreateSession: () => void;
  handleJoinSession: () => void;
  copyToClipboard: () => void;
  copied: boolean;
  timer: number;
}

const SessionModal: React.FC<SessionModalProps> = ({
  modalOpen,
  setModalOpen,
  sessionId,
  setSessionId,
  joinSessionId,
  setJoinSessionId,
  handleCreateSession,
  handleJoinSession,
  copyToClipboard,
  copied,
  timer
}) => {
  if (!modalOpen) return null; // If modal is closed, do not render

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-96 bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Session Management</h3>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        {!sessionId && (
          <button
            onClick={handleCreateSession}
            className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Create Session
          </button>
        )}
        {sessionId && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-200">{sessionId}</span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
        {!sessionId && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Enter session code"
              value={joinSessionId}
              onChange={(e) => setJoinSessionId(e.target.value)}
              className="px-3 py-1 rounded-lg bg-gray-700 text-gray-200"
            />
            <button
              onClick={handleJoinSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Join Session
            </button>
          </div>
        )}
        {sessionId && (
          <div className="text-lg text-gray-200 text-center mt-4">
            {formatTime(timer)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionModal;
