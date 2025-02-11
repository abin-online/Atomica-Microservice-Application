'use client';

import { getContestById, getMCQForContest, getProblemsForContest, updateResult } from '@/api/contest';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import axios from 'axios';
import TestCaseTabs from '@/components/PlayGround/TestCaseTabs';
import TestCase from '@/components/PlayGround/TestCases';
import { submitCode } from '@/api/compilation';
import Timer from '@/components/contest/Timer';
import { useConfirmationDialog } from '@/app/customHooks/useConfirmationDialog';
import { FetchTestCases } from '@/api/testCases';


interface Question {
    _id: string;
    question: string;
    options: {
        option1: string;
        option2: string;
        option3: string;
        option4: string;
    };
    correctAnswer: string;
    difficulty: string;
    tags: string;
    blocked: boolean;
}

const DoContest = () => {

    const user: any = localStorage.getItem('user')
    const USER = JSON.parse(user)

    const pathname = usePathname();
    const [contestName, setContestName] = useState('');
    const [selectedMCQs, setSelectedMCQs] = useState<string[]>([]);
    const [mcqsData, setMcqsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isMCQCompleted, setIsMCQCompleted] = useState(false);

    const [showResults, setShowResults] = useState(false);


    const [points, setPoints] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [problems, setProblems] = useState<any[]>([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [testCases, setTestCases] = useState<any[]>([]);
    const [code, setCode] = useState('// Write your solution here');
    const [testResults, setTestResults] = useState<any[]>([]);
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    const [showAll, setShowAll] = useState(false);
    const contestId = pathname.split('/').pop() || '';
    const [language, setlanguage] = useState('js')
    const [totalTests, setTotalTests] = useState(0);
    const [passedTests, setPassedTests] = useState(0);
    const [submitted, setSubmitted] = useState(false)
    const [problemResult, setProblemResult] = useState<number[]>([])
    const [mcqResult, setMcqResult] = useState<number[]>([])
    const [elapsedTime, setElapsedTime] = useState(0);

    const { dialog, openDialog } = useConfirmationDialog()

    useEffect(() => {
        const fetchContest = async () => {
            try {
                setLoading(true);
                const response: any = await getContestById(contestId);
                const contest = response.data;
                setContestName(contest.contestName);
                setSelectedMCQs(contest.selectedMCQs);
                setProblems(contest.selectedProblems);
                setDuration(contest.duration);
                setPoints(contest.points)
                // Fetch MCQs data
                if (contest.selectedMCQs.length > 0) {
                    const mcqResponse: any = await getMCQForContest(contest.selectedMCQs);
                    setMcqsData(mcqResponse.data || []);
                    setSelectedOptions(new Array(mcqResponse.data.length).fill(null)); // Initialize selected options
                }

                if (contest.selectedProblems.length > 0) {
                    const problemsResponse: any = await getProblemsForContest(contest.selectedProblems);
                    setProblems(problemsResponse.data || []);
                }
            } catch (error) {
                toast.error('Error fetching contest details');
                console.error('Error fetching contest:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContest();
    }, [contestId]);

    useEffect(() => {
        const fetchTestCases = async () => {
            try {
                const response : any = await FetchTestCases(problems[currentProblemIndex]?.title)
                if (response.data) {
                    setTestCases(response.data);
                }
            } catch (error) {
                console.error('Error fetching test cases:', error);
            }
        };

        if (problems[currentProblemIndex]?.title) {
            fetchTestCases();
        }
    }, [problems, currentProblemIndex]);

    const handleOptionChange = (option: string) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[currentQuestionIndex] = option;
        console.log(" updatedOptions[currentQuestionIndex]  =>", updatedOptions[currentQuestionIndex])
        setSelectedOptions(updatedOptions);
        console.log(" updatedOptions  =>", updatedOptions, selectedOptions)



        const updatedResults = mcqsData.map((q, idx) => {
            console.log(updatedOptions[idx], "  ", q.correctAnswer)
            return updatedOptions[idx] === q.correctAnswer ? 1 : 0
        }
        );
        setMcqResult(updatedResults);
        console.log("updated results", updatedResults)
        //localStorage.setItem("mcq results", JSON.stringify(updatedResults))


    };


    const handleNextQuestion = () => {
        if (selectedOptions[currentQuestionIndex]) {
            if (currentQuestionIndex < mcqsData.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                // const updatedResults = mcqsData.map((q, idx) =>
                //     selectedOptions[idx] === q.correctAnswer ? 1 : 0
                // ); 
                // setMcqResult(updatedResults);
            } else {
                // const updatedResults = mcqsData.map((q, idx) =>
                //     selectedOptions[idx] === q.correctAnswer ? 1 : 0
                // ); 
                // setMcqResult(updatedResults);
                setIsMCQCompleted(true);
            }
        } else {
            toast.error('Please select an option.')
        }

    };
    //=> |(✓)|


    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            // const updatedResults = mcqsData.map((q, idx) =>
            //     selectedOptions[idx] === q.correctAnswer ? 1 : 0
            // ); 
            // setMcqResult(updatedResults);
        }
    };

    const handleNextProblem = () => {
        if (currentProblemIndex < problems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
        } else {
            toast.error('This is the last question!');
        }
    };

    const handlePreviousProblem = () => {
        if (currentProblemIndex > 0) {
            setCurrentProblemIndex(currentProblemIndex - 1);
        } else {
            setIsMCQCompleted(false);
        }
    };


    useEffect(() => {
        const parameters: any = []
        if (problems[currentProblemIndex]?.inputFormat) {
            problems[currentProblemIndex]?.inputFormat.forEach((value: any) => {
                parameters.push(value.name)
            })
            const savedCode = localStorage.getItem(`${USER?.email}-${contestId}-${problems[currentProblemIndex]?.title}`)

            setCode(`function ${problems[currentProblemIndex]?.functionName}(${parameters.join(',')}){
        
}`);

            if (savedCode) {
                setCode(`${savedCode}`);
            }
        }

    }, [isMCQCompleted, problems, currentProblemIndex])




    const onCodeChange = (value: string) => {

        setCode(value);
        // const user: any = localStorage.getItem('user')
        // const USER = JSON.parse(user)
        localStorage.setItem(`${USER?.email}-${contestId}-${problems[currentProblemIndex]?.title}`, value)
    };

    const handleSubmit = async () => {
        try {
            // Submit the code with the selected language, problem title, and output format type

            const response: any = await submitCode(code, problems[currentProblemIndex]?.title, problems[currentProblemIndex]?.outputFormat?.type, language , problems[currentProblemIndex]?.functionName);
            console.log("Submit response for problem submision:", response);

            if (response.status === 200) {
                console.log("Success:", response.data);

                // Log the test cases and results for debugging
                console.log('Test cases:', testCases);
                console.log('Test results:', testResults);

                // Set the results of the submission
                setTestResults(response.data.results || []);
                //setSubmissionResults(response.data.results || []);

                // Calculate the number of passed tests and the total number of tests
                const results = response.data.results || [];
                const passed = results.filter((test: any) => test.passed).length;
                setPassedTests(passed)
                const total = results.length;
                setTotalTests(total)
                setSubmitted(true)
                const problem = problems[currentProblemIndex]?.title
                if (total === passed) {
                    const problemTitle = problems[currentProblemIndex]?.title;

                    if (!problemResult.includes(problemTitle)) {
                        setProblemResult(prevState => [...prevState, problemTitle]);
                    }
                }

                // Update the state with the total and passed tests
                // setTotalTests(total);
                // setPassedTests(passed);
                console.log("RESULTS: Passed", passed, "/", total);

                const currentTime = new Date().toLocaleString();
            }
        } catch (error: any) {
            console.error("Error submitting code:", error.message);
            toast.error("There was an error submitting your code. Please try again.");
        }
    };


    const handleElapsedTime = (time: number) => {
        setElapsedTime(time); // Update elapsed time
    };

    const handleTimeUp = () => {
        toast.error("Time's up! The contest has ended.");
    };
    const finish = () => {
        
        const postResult = async()=> {

            try {
                console.log("MCQ  RESULT ", mcqResult)
                console.log("PROBLSEM ", problemResult)
                const earned = problemResult.length + mcqResult.reduce((acc, curr)=> curr == 1 ? acc + 1 : acc , 0)
                const total = selectedMCQs.length + problems.length;

                const point = Math.floor((earned/total)* points )
                console.log("pointsss", point)
                const payload = {
                    name: USER?.name,
                    duration: Math.floor(elapsedTime / 60),
                    points: point
                }
                const response = await updateResult(contestId, payload);
                if(response?.status == 201){
                    setShowResults(true);
                }
            } catch (error) {
                
            }
        }
        postResult()

    }

    useEffect(() => {
        console.log("MCQ RESULT: ", mcqResult);
        console.log("PROBLEM RESULT: ", problemResult);

    }, [mcqResult, problemResult]);

    const confirmFinish = () => {

        openDialog({
            title: 'Status Confirmation',
            message: `Are you sure you want to finish the contest?`,
            onConfirm: () => finish(),
        });
    };


    return (
        <>   {

            !showResults ? (<div className="min-h-screen bg-gray-100">
                {/* Timer Section */}
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-10 w-10"></div>
                        <p className="ml-4 text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <>
                        {/* Sticky Timer */}
                        <div className="flex justify-between items-center py-4 bg-white shadow-md sticky top-0 z-10">
                            {/* Timer in the middle */}
                            <div className="flex-grow flex justify-center">
                                <Timer
                                    duration={duration}
                                    onTimeUp={handleTimeUp}
                                    onElapsedTime={handleElapsedTime}
                                />
                            </div>

                            {/* Finish button on the right */}
                            <button
                                onClick={confirmFinish}
                                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                            >
                                FINISH
                            </button>
                        </div>


                        {/* Main Content */}
                        {isMCQCompleted ? (
                            <div className="flex flex-col">
                                {/* Navigation for Problems */}
                                <div className="flex justify-center items-center gap-2 py-3">
                                    <button
                                        onClick={handlePreviousProblem}
                                        className="flex items-center px-3 py-1.5 w-20 text-center bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-sm"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex items-center px-3 py-1.5 w-20 text-center bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-sm"
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
                                    <button
                                        onClick={handleNextProblem}
                                        className="flex items-center px-3 py-1.5 w-20 text-center bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-sm"
                                    >
                                        Next
                                    </button>
                                </div>

                                {/* Problem and Code Editor */}
                                <div className="grid grid-cols-3 gap-4 min-h-screen">
                                    <div className="bg-gray-50 p-4 rounded shadow overflow-auto">
                                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Problem {currentProblemIndex + 1}</h2>
                                        <h3 className="text-xl font-semibold">Description</h3>
                                        <p>{problems[currentProblemIndex]?.description || 'No description available.'}</p>
                                    </div>
                                    <div className="col-span-1 p-4 bg-gray-900 rounded shadow">
                                        <CodeMirror
                                            value={code}
                                            width="100%"
                                            height="400px"
                                            theme={vscodeDark}
                                            extensions={[javascript()]}
                                            onPasteCapture={() =>
                                                toast.error(
                                                    <div style={{ textAlign: 'center' }}>
                                                        Try solving it yourself! <br />
                                                        Looks like you're trying to paste!
                                                    </div>
                                                )
                                            }
                                            onChange={onCodeChange}
                                        />
                                    </div>
                                    {/* Test Case Section */}
                                    {submitted ? (
                                        <div className="p-6 bg-gray-800 rounded shadow">
                                            {/* Submission Results */}
                                            <h3 className="text-2xl font-medium mb-4">
                                                {passedTests === totalTests
                                                    ? "All test cases passed! Well done!"
                                                    : `Try again, ${totalTests - passedTests} test case${totalTests - passedTests > 1 ? "s" : ""
                                                    } left to pass`}
                                            </h3>
                                            {/* Navigation Based on Results */}
                                            {passedTests === totalTests ? (
                                                <>
                                                    <button
                                                        onClick={() => handleNextProblem()}
                                                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                                                    >
                                                        Next Problem
                                                    </button>
                                                    <button
                                                        onClick={() => setSubmitted(false)}
                                                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                                                    >
                                                        X
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setSubmitted(false)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                                                >
                                                    Try Again
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-6 bg-gray-800 rounded shadow overflow-y-auto">
                                            <h3 className="text-2xl font-medium mb-4">Test Cases</h3>
                                            <TestCaseTabs
                                                testCases={testCases}
                                                testResults={testResults}
                                                activeTestCaseId={activeTestCaseId}
                                                setActiveTestCaseId={setActiveTestCaseId}
                                            />
                                            {testCases.map((testCase, index) => {
                                                if (index !== activeTestCaseId) return null;

                                                const result = testResults.find(
                                                    (result) => result.input[0].params === testCase.input[0].params
                                                );

                                                return (
                                                    <TestCase
                                                        key={testCase._id}
                                                        testCase={testCase}
                                                        result={result || { logs: [] }}
                                                        showAll={showAll}
                                                        setShowAll={setShowAll}
                                                        problem={problems[currentProblemIndex]}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-6xl py mx-auto p-6 bg-white shadow-md rounded-lg">
                                <div className="question-box p-6 bg-gray-50 rounded-lg shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-4">{`Q${currentQuestionIndex + 1}: ${mcqsData[currentQuestionIndex]?.question}`}</h3>
                                    <ul className="space-y-4">
                                        {Object.entries(mcqsData[currentQuestionIndex]?.options || {}).map(([key, option]) => (
                                            <li key={key}>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="radio"
                                                        name={`mcq-${currentQuestionIndex}`}
                                                        value={String(option)}
                                                        checked={selectedOptions[currentQuestionIndex] === option}
                                                        onChange={() => handleOptionChange(String(option))}
                                                        className="form-radio h-5 w-5 text-primary-500"
                                                    />
                                                    <span className="text-gray-700">{String(option)}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 flex justify-between items-center">
                                        {currentQuestionIndex > 0 && (
                                            <button
                                                onClick={handlePreviousQuestion}
                                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90"
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <button
                                            onClick={handleNextQuestion}
                                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90"
                                        >
                                            {currentQuestionIndex === mcqsData.length - 1 ? 'Go to problems' : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>) : (
                <div className="mt-10">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6">Contest Results</h2>

                        {/* MCQ Results */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">MCQ Results:</h3>
                            <ul className="space-y-2">
                                {mcqResult.map((result, index) => (
                                    <li key={index} className={`py-2 px-4 rounded-lg ${result === 1 ? 'bg-green-200' : 'bg-red-200'}`}>
                                        Question {index + 1}: {result === 1 ? 'Correct' : 'Incorrect'}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Problem Results */}
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Problem Results:</h3>
                            <ul className="space-y-2">
                                {problems.map((pro, index) => {
                                    // Check if the current problem is in the problemResult (solved problems)
                                    const isSolved = problemResult.includes(pro.title);
                                    console.log("problem Result       ", problemResult)
                                    return (

                                        <li
                                            key={index}
                                            className={`py-2 px-4 rounded-lg ${problemResult.includes(pro.title) ? 'bg-green-200' : 'bg-red-200'}`}
                                        >
                                            {pro.title}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <p className="mb-4">
                        Time Taken: {Math.floor(elapsedTime / 60)} mins {elapsedTime % 60} secs
                    </p>

                        {/* Optionally, you can add a 'Close' button to hide the results */}
                        <button
                            onClick={() => setShowResults(false)}
                            className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
        }
            {dialog}
        </>
    );

};

export default DoContest;
