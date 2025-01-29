'use client'

import React from 'react';


interface TestCaseProps {
  testCase: {
    _id: string;
    input: Array<{ params: string }>;
    expectedOutput: string;
  };
  result: {
    error?: string;
    output?: string;
    logs: string[];
  };
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  problem: {
    inputFormat: Array<{ name: string }>;
  };
}


const TestCase: React.FC<TestCaseProps> = ({ testCase, result, showAll, setShowAll, problem }) => {
  return (
    <div key={testCase._id} className="py-4 space-y-4">
      {/* Input */}
      <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
        <pre className="font-mono text-sm">
          <strong className="text-gray-100">Input:</strong>
          {testCase.input.map((param, idx) => (
            <div key={idx}>
              <strong className="text-gray-100">
                {problem.inputFormat[idx]?.name || `Parameter ${idx + 1}`} :
              </strong>
              <span> {param.params}</span>
            </div>
          ))}

        </pre>
      </div>

      {/* Expected Output */}
      <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
        <pre className="font-mono text-sm">
          <strong className="text-gray-100">Target:</strong> {testCase.expectedOutput}
        </pre>
      </div>

      {/* Show Error if Present */}
      {result?.error ? (
        <div
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            scrollbarWidth: "thin", // Firefox support
            scrollbarColor: "#9e9e9e #2d2d2d", // Thumb and track colors
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong className="text-gray-100">Error:</strong>
          <div
            className="mt-2 space-y-2 max-h-64 overflow-y-auto bg-gray-800 p-3 rounded"
            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
          >
            {result.error
              .split("\n")
              .slice(2, 17) // Adjust slice indices as needed
              .map((line: any, index) => (
                line.trim() === 0 ? null : (
                  <div key={index} className="font-mono text-sm text-red-400">
                    {line}
                  </div>
                )
              ))}
          </div>
        </div>
      ) : (
        // Output Section (only shown if there's no error)
        result?.output && (
          <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
            <pre className="font-mono text-sm">
              <strong className="text-gray-100">Output:</strong> {result.output}
            </pre>
          </div>
        )
      )}

      {/* Logs */}
      {result?.logs.length > 0 && (
        <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
          <strong className="text-gray-100">stdout:</strong>
          <div className="mt-2 space-y-2 bg-gray-800">
            {result.logs.slice(0, showAll ? result.logs.length : 3).map((log: any, index) => (
              log.trim() === 0 ? null : (
                <pre key={index} className="font-mono text-sm p-2 rounded bg-gray-800 text-gray-100">
                  {log}
                </pre>
              )
            ))}
            {result.logs.length > 3 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="mt-2 text-blue-400 hover:underline"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCase;
