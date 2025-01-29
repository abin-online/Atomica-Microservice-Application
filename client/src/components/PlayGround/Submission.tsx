'use client'

import React, { useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { EditorView } from '@codemirror/view';
import { postSolution } from '@/api/community';
import toast from 'react-hot-toast';

interface SubmissionResultProps {
    problem: string;
    passedTests: number;
    totalTests: number;
    userName: string;
    submissionTime: string;
    code: string;
    setSubmitResult: (value: boolean) => void;
}


const SubmissionResult: React.FC<SubmissionResultProps> = ({ problem, passedTests, totalTests, userName, submissionTime, code, setSubmitResult }) => {
    
    const [notes, setNotes] = useState<string>('');
    const user: any = localStorage.getItem('user')
    const USER = JSON.parse(user)

    const submitSolution = async () => {
        try {
            const payload = {
                author: USER?.name,
                email: USER?.email,
                problem,
                code,
                language: 'Js',
                notes
            }
            console.log("note", notes)
            const response = await postSolution(payload);
            console.log("solution submission ", response)
            if(response?.status == 201) {
                toast.success('Your solution is successfully submitted')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto rounded-md shadow-lg">
            {/* Submission Result Header */}
            <div className="text-left mb-6">
                <h2 className="text-xl font-bold text-green-500 mb-2">Accepted</h2>
                <p className="text-lg text-gray-300 mb-4">
                    {passedTests} / {totalTests} test cases passed
                </p>
                <p className="text-sm text-gray-400 mb-2">
                    Submitted by: <span className="font-medium text-white">{userName}</span>
                </p>
                <p className="text-sm text-gray-400">
                    Submitted at: <span className="font-medium text-white">{submissionTime}</span>
                </p>
            </div>

            {/* Accepted Solution Section */}
            <div className="mb-6">
                <h3 className="text-2xl font-medium mb-4 text-white">Accepted Solution</h3>
                <CodeMirror
                    value={code}
                    width="470px"
                    height="200px"
                    theme={vscodeDark}
                    extensions={[
                        javascript(), // Add syntax highlighting for JavaScript
                        EditorView.editable.of(false) // Disable editing
                    ]}
                    basicSetup={{
                        lineNumbers: false // Disable line numbers
                    }}
                    readOnly={true} // Ensures the editor behaves like a textarea
                />
            </div>

            {/* Note Section */}
            <div className="mb-6">
                <h3 className="text-xl font-medium mb-2 text-white">Add a Note</h3>
                <textarea
                    placeholder="Add your notes or comments here..."
                    className="w-full p-3 bg-gray-700 text-white rounded-md resize-none border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-between items-center">
                <button
                    onClick={submitSolution}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                    Post Your Answer
                </button>
                <button
                    onClick={() => setSubmitResult(false)}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SubmissionResult;
