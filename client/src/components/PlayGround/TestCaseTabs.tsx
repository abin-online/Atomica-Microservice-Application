'use client'

// TestCaseTabs.tsx
import React from "react";

interface TestCaseTabsProps {
  testCases: any[];
  testResults: any[];
  activeTestCaseId: number;
  setActiveTestCaseId: React.Dispatch<React.SetStateAction<number>>;
}

const TestCaseTabs: React.FC<TestCaseTabsProps> = ({
  testCases,
  testResults,
  activeTestCaseId,
  setActiveTestCaseId
}) => {
  return (
    <div className="flex space-x-2 mb-4">
      {testCases.map((testCase, index) => {
        const result = testResults.find(
          (result) => result.input[0].params === testCase.input[0].params
        );

        const passed = result?.passed;
        console.log("passed or not", result, passed);

        return (
          <div
            key={testCase._id}
            onClick={() => setActiveTestCaseId(index)}
            className={`cursor-pointer py-2 px-4 rounded-lg transition-all ${index === activeTestCaseId
              ? "bg-gray-700 text-gray-300 hover:bg-dark-layer-2"
              : "bg-dark-fill-3 text-white"
              }`}
          >
            <div className="flex items-center">
              <div
                className={`h-1.5 w-1.5 rounded-full ${passed === true
                  ? "bg-green-500"
                  : passed === false
                    ? "bg-red-500"
                    : ""
                  }`}
              ></div>
              <span className="ml-2">Case {index + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestCaseTabs;
